/*
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.ballerinalang.stdlib.time.util;

import org.ballerinalang.jvm.BallerinaErrors;
import org.ballerinalang.jvm.BallerinaValues;
import org.ballerinalang.jvm.StringUtils;
import org.ballerinalang.jvm.values.ErrorValue;
import org.ballerinalang.jvm.values.MapValue;
import org.ballerinalang.jvm.values.api.BString;

import java.time.DateTimeException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoField;
import java.time.temporal.TemporalAccessor;
import java.time.zone.ZoneRulesException;
import java.util.Date;
import java.util.TimeZone;

import static org.ballerinalang.stdlib.time.util.Constants.KEY_ZONED_DATETIME;
import static org.ballerinalang.stdlib.time.util.Constants.STRUCT_TYPE_TIME;
import static org.ballerinalang.stdlib.time.util.Constants.STRUCT_TYPE_TIMEZONE;
import static org.ballerinalang.stdlib.time.util.Constants.TIME_ERROR_CODE;
import static org.ballerinalang.stdlib.time.util.Constants.TIME_FIELD;
import static org.ballerinalang.stdlib.time.util.Constants.TIME_PACKAGE_ID;
import static org.ballerinalang.stdlib.time.util.Constants.ZONE_FIELD;
import static org.ballerinalang.stdlib.time.util.Constants.ZONE_ID_FIELD;

/**
 * A util class for the time package's native implementation.
 *
 * @since 0.95.4
 */
public class TimeUtils {

    public static MapValue<BString, Object> createTimeZone(MapValue<BString, Object> timeZoneRecord,
                                                           BString zoneIdValue) {
        ZoneId zoneId = getTimeZone(zoneIdValue);
        //Get offset in seconds
        TimeZone tz = TimeZone.getTimeZone(zoneId);
        int offsetInMills = tz.getOffset(new Date().getTime());
        long offset = offsetInMills / 1000;
        return BallerinaValues.createRecord(timeZoneRecord, zoneIdValue, offset);

    }

    public static MapValue<BString, Object> createDateTime(int year, int month, int day, int hour, int minute,
                                                           int second, int milliSecond, BString zoneIDStr) {
        int nanoSecond = milliSecond * 1000000;
        ZoneId zoneId;
        if (zoneIDStr.getValue().isEmpty()) {
            zoneId = ZoneId.systemDefault();
            zoneIDStr = StringUtils.fromString(zoneId.toString());
        } else {
            zoneId = TimeUtils.getTimeZone(zoneIDStr);
        }
        ZonedDateTime zonedDateTime = ZonedDateTime.of(year, month, day, hour, minute, second, nanoSecond, zoneId);
        long timeValue = zonedDateTime.toInstant().toEpochMilli();
        return TimeUtils.createTimeRecord(getTimeZoneRecord(), getTimeRecord(), timeValue, zoneIDStr);
    }

    public static ZoneId getTimeZone(BString zoneIdValue) {
        try {
            return ZoneId.of(zoneIdValue.getValue());
        } catch (ZoneRulesException e) {
            throw TimeUtils.getTimeError("invalid timezone id: " + zoneIdValue);
        }
    }

    public static MapValue<BString, Object> createTimeRecord(MapValue<BString, Object> timeZoneRecord,
                                                             MapValue<BString, Object> timeRecord, long millis,
                                                             BString zoneIdName) {
        MapValue<BString, Object> timezone = createTimeZone(timeZoneRecord, zoneIdName);
        return BallerinaValues.createRecord(timeRecord, millis, timezone);
    }

    public static MapValue<BString, Object> getTimeZoneRecord() {
        return BallerinaValues.createRecordValue(TIME_PACKAGE_ID, STRUCT_TYPE_TIMEZONE);
    }

    public static MapValue<BString, Object> getTimeRecord() {
        return BallerinaValues.createRecordValue(TIME_PACKAGE_ID, STRUCT_TYPE_TIME);
    }

    public static ErrorValue getTimeError(String message) {
        return BallerinaErrors.createError(StringUtils.fromString(TIME_ERROR_CODE), StringUtils.fromString(message));
    }

    public static MapValue<BString, Object> getTimeRecord(TemporalAccessor dateTime, BString dateString,
                                                          BString pattern) {
        MapValue<BString, Object> timeZoneRecord = TimeUtils.getTimeZoneRecord();
        MapValue<BString, Object> timeRecord = TimeUtils.getTimeRecord();
        long epochTime = -1;
        String zoneId;
        try {
            epochTime = Instant.from(dateTime).toEpochMilli();
            zoneId = String.valueOf(ZoneId.from(dateTime));
        } catch (DateTimeException e) {
            if (epochTime < 0) {
                throw TimeUtils.getTimeError("failed to parse \"" + dateString.getValue() + "\" to the " +
                        pattern.getValue() + " format");
            }
            zoneId = ZoneId.systemDefault().toString();
        }
        return TimeUtils.createTimeRecord(timeZoneRecord, timeRecord, epochTime, StringUtils.fromString(zoneId));
    }

    public static BString getFormattedString(MapValue<BString, Object> timeRecord, BString pattern)
            throws IllegalArgumentException {
        ZonedDateTime dateTime = getZonedDateTime(timeRecord);
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(pattern.getValue());
        return StringUtils.fromString(dateTime.format(dateTimeFormatter));
    }

    public static BString getDefaultString(MapValue<BString, Object> timeRecord) {
        ZonedDateTime dateTime = getZonedDateTime(timeRecord);
        return StringUtils.fromString(dateTime.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME));
    }

    public static MapValue<BString, Object> parseTime(BString dateValue, BString pattern) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern.getValue());
            TemporalAccessor temporalAccessor = formatter.parse(dateValue.getValue());
            //Initialize with default values
            int year = 1970;
            int month = 1;
            int day = 1;
            int hour = 0;
            int minute = 0;
            int second = 0;
            int nanoSecond = 0;
            if (temporalAccessor.isSupported(ChronoField.YEAR)) {
                year = temporalAccessor.get(ChronoField.YEAR);
            }
            if (temporalAccessor.isSupported(ChronoField.MONTH_OF_YEAR)) {
                month = temporalAccessor.get(ChronoField.MONTH_OF_YEAR);
            }
            if (temporalAccessor.isSupported(ChronoField.DAY_OF_MONTH)) {
                day = temporalAccessor.get(ChronoField.DAY_OF_MONTH);
            }
            if (temporalAccessor.isSupported(ChronoField.HOUR_OF_DAY)) {
                hour = temporalAccessor.get(ChronoField.HOUR_OF_DAY);
            }
            if (temporalAccessor.isSupported(ChronoField.MINUTE_OF_HOUR)) {
                minute = temporalAccessor.get(ChronoField.MINUTE_OF_HOUR);
            }
            if (temporalAccessor.isSupported(ChronoField.SECOND_OF_MINUTE)) {
                second = temporalAccessor.get(ChronoField.SECOND_OF_MINUTE);
            }
            if (temporalAccessor.isSupported(ChronoField.NANO_OF_SECOND)) {
                nanoSecond = temporalAccessor.get(ChronoField.NANO_OF_SECOND);
            }

            ZoneId zoneId;
            try {
                zoneId = ZoneId.from(temporalAccessor);
            } catch (DateTimeException e) {
                zoneId = ZoneId.systemDefault(); // Initialize to the default system timezone
            }

            ZonedDateTime zonedDateTime = ZonedDateTime.of(year, month, day, hour, minute, second, nanoSecond, zoneId);
            long timeValue = zonedDateTime.toInstant().toEpochMilli();
            return TimeUtils.createTimeRecord(getTimeZoneRecord(), getTimeRecord(), timeValue,
                    StringUtils.fromString(zoneId.toString()));
        } catch (DateTimeParseException e) {
            throw TimeUtils.getTimeError("parse date \"" + dateValue + "\" for the format \"" + pattern + "\" "
                    + "failed:" + e.getMessage());
        } catch (IllegalArgumentException e) {
            throw TimeUtils.getTimeError("invalid pattern: " + pattern);
        }
    }


    public static ZonedDateTime getZonedDateTime(MapValue<BString, Object> timeRecord) {
        ZonedDateTime dateTime = (ZonedDateTime) timeRecord.getNativeData(KEY_ZONED_DATETIME);
        if (dateTime != null) {
            return dateTime;
        }
        long timeData = timeRecord.getIntValue(StringUtils.fromString(TIME_FIELD));
        MapValue<BString, Object> zoneData =
                (MapValue<BString, Object>) timeRecord.getMapValue(StringUtils.fromString(ZONE_FIELD));
        ZoneId zoneId;
        if (zoneData != null) {
            String zoneIdName = zoneData.getStringValue(StringUtils.fromString(ZONE_ID_FIELD)).toString();
            if (zoneIdName.isEmpty()) {
                zoneId = ZoneId.systemDefault();
            } else {
                zoneId = TimeUtils.getTimeZone(StringUtils.fromString(zoneIdName));
            }
        } else {
            zoneId = ZoneId.systemDefault();
        }
        dateTime = Instant.ofEpochMilli(timeData).atZone(zoneId);
        timeRecord.addNativeData(KEY_ZONED_DATETIME, dateTime);
        return dateTime;
    }

    public static MapValue<BString, Object> changeTimezone(MapValue<BString, Object> timeRecord, BString zoneId) {
        MapValue<BString, Object> timezone = TimeUtils.createTimeZone(TimeUtils.getTimeZoneRecord(), zoneId);
        timeRecord.put(StringUtils.fromString(ZONE_FIELD), timezone);
        clearRecordCache(timeRecord);
        return timeRecord;
    }

    private static void clearRecordCache(MapValue<BString, Object> timeRecord) {
        timeRecord.addNativeData(KEY_ZONED_DATETIME, null);
    }

    public static BString getZoneId(MapValue<BString, Object> timeRecord) {
        MapValue<BString, Object> zoneData =
                (MapValue<BString, Object>) timeRecord.getMapValue(StringUtils.fromString(ZONE_FIELD));
        return zoneData.getStringValue(StringUtils.fromString(ZONE_ID_FIELD));
    }
}
