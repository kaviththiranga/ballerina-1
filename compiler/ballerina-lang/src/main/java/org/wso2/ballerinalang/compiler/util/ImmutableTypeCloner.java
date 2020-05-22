/*
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.wso2.ballerinalang.compiler.util;

import org.ballerinalang.model.elements.PackageID;
import org.wso2.ballerinalang.compiler.parser.BLangAnonymousModelHelper;
import org.wso2.ballerinalang.compiler.semantics.analyzer.Types;
import org.wso2.ballerinalang.compiler.semantics.model.Scope;
import org.wso2.ballerinalang.compiler.semantics.model.SymbolEnv;
import org.wso2.ballerinalang.compiler.semantics.model.SymbolTable;
import org.wso2.ballerinalang.compiler.semantics.model.symbols.BAttachedFunction;
import org.wso2.ballerinalang.compiler.semantics.model.symbols.BInvokableSymbol;
import org.wso2.ballerinalang.compiler.semantics.model.symbols.BInvokableTypeSymbol;
import org.wso2.ballerinalang.compiler.semantics.model.symbols.BRecordTypeSymbol;
import org.wso2.ballerinalang.compiler.semantics.model.symbols.BTypeSymbol;
import org.wso2.ballerinalang.compiler.semantics.model.symbols.BVarSymbol;
import org.wso2.ballerinalang.compiler.semantics.model.symbols.Symbols;
import org.wso2.ballerinalang.compiler.semantics.model.types.BAnyType;
import org.wso2.ballerinalang.compiler.semantics.model.types.BAnydataType;
import org.wso2.ballerinalang.compiler.semantics.model.types.BArrayType;
import org.wso2.ballerinalang.compiler.semantics.model.types.BField;
import org.wso2.ballerinalang.compiler.semantics.model.types.BInvokableType;
import org.wso2.ballerinalang.compiler.semantics.model.types.BJSONType;
import org.wso2.ballerinalang.compiler.semantics.model.types.BMapType;
import org.wso2.ballerinalang.compiler.semantics.model.types.BRecordType;
import org.wso2.ballerinalang.compiler.semantics.model.types.BTupleType;
import org.wso2.ballerinalang.compiler.semantics.model.types.BType;
import org.wso2.ballerinalang.compiler.semantics.model.types.BUnionType;
import org.wso2.ballerinalang.compiler.semantics.model.types.BXMLSubType;
import org.wso2.ballerinalang.compiler.semantics.model.types.BXMLType;
import org.wso2.ballerinalang.compiler.tree.BLangTypeDefinition;
import org.wso2.ballerinalang.compiler.tree.types.BLangRecordTypeNode;
import org.wso2.ballerinalang.compiler.util.diagnotic.DiagnosticPos;
import org.wso2.ballerinalang.util.Flags;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/**
 * Helper class to create a clone of it.
 *
 * @since 1.3.0
 */
public class ImmutableTypeCloner {

    private static final String AND_READONLY_SUFFIX = " & readonly";

    public static BType setImmutableType(DiagnosticPos pos, Types types, BType type, SymbolEnv env,
                                         SymbolTable symTable, BLangAnonymousModelHelper anonymousModelHelper,
                                         Names names) {
        return setImmutableType(pos, types, type, env, symTable, anonymousModelHelper, names, new HashSet<>());
    }

    private static BType setImmutableType(DiagnosticPos pos, Types types, BType type, SymbolEnv env,
                                         SymbolTable symTable, BLangAnonymousModelHelper anonymousModelHelper,
                                         Names names, Set<BType> unresolvedTypes) {
        if (types.isInherentlyImmutableType(type) || Symbols.isFlagOn(type.flags, Flags.READONLY)) {
            return type;
        }

        switch (type.tag) {
            case TypeTags.XML_COMMENT:
            case TypeTags.XML_ELEMENT:
            case TypeTags.XML_PI:
                BXMLSubType origXmlSubType = (BXMLSubType) type;
                BXMLSubType immutableXmlSubType = origXmlSubType.immutableType;
                if (immutableXmlSubType != null) {
                    return immutableXmlSubType;
                }

                // TODO: 4/28/20 Check tsymbol
                immutableXmlSubType = new BXMLSubType(origXmlSubType.tag,
                                                   names.fromString(origXmlSubType.name.getValue()
                                                                            .concat(AND_READONLY_SUFFIX)),
                                                   origXmlSubType.flags | Flags.READONLY);
                origXmlSubType.immutableType = immutableXmlSubType;
                return immutableXmlSubType;
            case TypeTags.XML:
                BXMLType origXmlType = (BXMLType) type;
                BXMLType immutableXmlType = origXmlType.immutableType;
                if (immutableXmlType != null) {
                    return immutableXmlType;
                }

                BTypeSymbol immutableXmlTSymbol = getReadonlyTSymbol(names, origXmlType.tsymbol, env);
                immutableXmlType = new BXMLType(setImmutableType(pos, types, origXmlType.constraint, env, symTable,
                                                                 anonymousModelHelper, names, unresolvedTypes),
                                                immutableXmlTSymbol, origXmlType.flags | Flags.READONLY);
                immutableXmlTSymbol.type = immutableXmlType;
                origXmlType.immutableType = immutableXmlType;
                return immutableXmlType;
            case TypeTags.ARRAY:
                BArrayType origArrayType = (BArrayType) type;
                BArrayType immutableArrayType = origArrayType.immutableType;
                if (immutableArrayType != null) {
                    return immutableArrayType;
                }

                BTypeSymbol immutableArrayTSymbol = getReadonlyTSymbol(names, origArrayType.tsymbol, env);
                immutableArrayType = new BArrayType(setImmutableType(pos, types, origArrayType.getElementType(), env,
                                                                     symTable, anonymousModelHelper, names,
                                                                     unresolvedTypes),
                                                    immutableArrayTSymbol, origArrayType.size, origArrayType.state,
                                                    origArrayType.flags | Flags.READONLY);
                immutableArrayTSymbol.type = immutableArrayType;
                origArrayType.immutableType = immutableArrayType;
                return immutableArrayType;
            case TypeTags.TUPLE:
                BTupleType origTupleType = (BTupleType) type;
                BTupleType immutableTupleType = origTupleType.immutableType;
                if (immutableTupleType != null) {
                    return immutableTupleType;
                }

                List<BType> origTupleMemTypes = origTupleType.tupleTypes;
                List<BType> immutableMemTypes = new ArrayList<>(origTupleMemTypes.size());

                for (BType origTupleMemType : origTupleMemTypes) {
                    immutableMemTypes.add(setImmutableType(pos, types, origTupleMemType, env, symTable,
                                                           anonymousModelHelper, names, unresolvedTypes));
                }

                BTypeSymbol immutableTupleTSymbol = getReadonlyTSymbol(names, origTupleType.tsymbol, env);
                BType origRestType = origTupleType.restType;
                BType tupleRestType = origRestType == null ? origRestType :
                        setImmutableType(pos, types, origRestType, env, symTable, anonymousModelHelper, names,
                                         unresolvedTypes);
                immutableTupleType = new BTupleType(immutableTupleTSymbol, immutableMemTypes, tupleRestType,
                                                    origTupleType.flags | Flags.READONLY);
                immutableTupleTSymbol.type = immutableTupleType;
                origTupleType.immutableType = immutableTupleType;
                return immutableTupleType;
            case TypeTags.MAP:
                BMapType origMapType = (BMapType) type;
                BMapType immutableMapType = origMapType.immutableType;
                if (immutableMapType != null) {
                    return immutableMapType;
                }

                BTypeSymbol immutableMapTSymbol = getReadonlyTSymbol(names, origMapType.tsymbol, env);
                immutableMapType = new BMapType(origMapType.tag, setImmutableType(pos, types, origMapType.constraint,
                                                                                  env, symTable, anonymousModelHelper,
                                                                                  names, unresolvedTypes),
                                                immutableMapTSymbol, origMapType.flags | Flags.READONLY);
                immutableMapTSymbol.type = immutableMapType;
                origMapType.immutableType = immutableMapType;
                return immutableMapType;
            case TypeTags.RECORD:
                BRecordType origRecordType = (BRecordType) type;
                BRecordType immutableRecordType = origRecordType.immutableType;
                if (immutableRecordType != null) {
                    return immutableRecordType;
                }

                immutableRecordType = defineImmutableRecordType(pos, origRecordType, env, symTable,
                                                                anonymousModelHelper, names, types, unresolvedTypes);
                return immutableRecordType;
            case TypeTags.TABLE:
                // TODO: see https://github.com/ballerina-platform/ballerina-lang/issues/23006
                return type;
            case TypeTags.ANY:
                BAnyType origAnyType = (BAnyType) type;
                BAnyType immutableAnyType = origAnyType.immutableType;
                if (immutableAnyType != null) {
                    return immutableAnyType;
                }

                BTypeSymbol immutableAnyTSymbol = getReadonlyTSymbol(names, origAnyType.tsymbol, env);
                immutableAnyType = new BAnyType(origAnyType.tag, immutableAnyTSymbol, immutableAnyTSymbol.name,
                                                origAnyType.flags | Flags.READONLY, origAnyType.isNullable());
                immutableAnyTSymbol.type = immutableAnyType;
                origAnyType.immutableType = immutableAnyType;
                return immutableAnyType;
            case TypeTags.ANYDATA:
                BAnydataType origAnydataType = (BAnydataType) type;
                BAnydataType immutableAnydataType = origAnydataType.immutableType;
                if (immutableAnydataType != null) {
                    return immutableAnydataType;
                }

                BTypeSymbol immutableAnydataTSymbol = getReadonlyTSymbol(names, origAnydataType.tsymbol, env);
                immutableAnydataType = new BAnydataType(origAnydataType.tag, immutableAnydataTSymbol,
                                                        immutableAnydataTSymbol.name,
                                                        origAnydataType.flags | Flags.READONLY,
                                                        origAnydataType.isNullable());
                immutableAnydataTSymbol.type = immutableAnydataType;
                origAnydataType.immutableType = immutableAnydataType;
                return immutableAnydataType;
            case TypeTags.JSON:
                BJSONType origJsonType = (BJSONType) type;
                BJSONType immutableJsonType = origJsonType.immutableType;
                if (immutableJsonType != null) {
                    return immutableJsonType;
                }

                BTypeSymbol immutableJsonTSymbol = getReadonlyTSymbol(names, origJsonType.tsymbol, env);
                immutableJsonType = new BJSONType(origJsonType.tag, immutableJsonTSymbol, origJsonType.isNullable(),
                                                  origJsonType.flags | Flags.READONLY);
                immutableJsonTSymbol.type = immutableJsonType;
                origJsonType.immutableType = immutableJsonType;
                return immutableJsonType;
            default:
                BUnionType origUnionType = (BUnionType) type;
                BType immutableType = origUnionType.immutableType;
                if (immutableType != null) {
                    return immutableType;
                }

                LinkedHashSet<BType> readOnlyMemTypes = new LinkedHashSet<>();

                for (BType memberType : origUnionType.getMemberTypes()) {
                    if (types.isInherentlyImmutableType(memberType)) {
                        readOnlyMemTypes.add(memberType);
                        continue;
                    }

                    if (!types.isSelectivelyImmutableType(memberType, unresolvedTypes)) {
                        continue;
                    }

                    readOnlyMemTypes.add(setImmutableType(pos, types, memberType, env, symTable, anonymousModelHelper,
                                                          names, unresolvedTypes));
                }

                if (readOnlyMemTypes.size() == 1) {
                    immutableType = readOnlyMemTypes.iterator().next();
                } else if (origUnionType.tsymbol != null) {
                    BTypeSymbol immutableUnionTSymbol = getReadonlyTSymbol(names, origUnionType.tsymbol, env);
                    immutableType = BUnionType.create(immutableUnionTSymbol, readOnlyMemTypes);
                    immutableType.flags |= (origUnionType.flags | Flags.READONLY);
                    immutableUnionTSymbol.type = immutableType;
                } else {
                    immutableType = BUnionType.create(null, readOnlyMemTypes);
                    immutableType.flags |= (origUnionType.flags | Flags.READONLY);
                }
                origUnionType.immutableType = immutableType;
                return immutableType;
        }
    }

    public static void defineUndefinedImmutableRecordFields(BLangTypeDefinition typeDefinition, Types types,
                                                            SymbolEnv pkgEnv, SymbolTable symTable,
                                                            BLangAnonymousModelHelper anonymousModelHelper,
                                                            Names names) {
        BRecordType immutableRecordType = (BRecordType) typeDefinition.type;
        BRecordType origRecordType = immutableRecordType.mutableType;
        DiagnosticPos pos = typeDefinition.pos;
        SymbolEnv env = SymbolEnv.createTypeEnv(typeDefinition.typeNode, typeDefinition.symbol.scope, pkgEnv);
        PackageID pkgID = env.enclPkg.symbol.pkgID;

        if (origRecordType.fields.size() != immutableRecordType.fields.size()) {
            immutableRecordType.fields = getImmutableFields(types, symTable, anonymousModelHelper, names,
                                                            immutableRecordType.tsymbol, origRecordType, pos, env,
                                                            pkgID);
        }

        BType currentRestFieldType = immutableRecordType.restFieldType;
        if (currentRestFieldType != null && currentRestFieldType != symTable.noType) {
            return;
        }

        setRestType(types, symTable, anonymousModelHelper, names, immutableRecordType, origRecordType, pos, env,
                    new HashSet<>());
    }

    private static LinkedHashMap<String, BField> getImmutableFields(Types types, SymbolTable symTable,
                                                                    BLangAnonymousModelHelper anonymousModelHelper,
                                                                    Names names, BTypeSymbol immutableRecordSymbol,
                                                                    BRecordType origRecordType, DiagnosticPos pos,
                                                                    SymbolEnv env, PackageID pkgID) {
        LinkedHashMap<String, BField> fields = new LinkedHashMap<>();

        for (BField origField : origRecordType.fields.values()) {
            BType immutableFieldType = setImmutableType(pos, types, origField.type, env, symTable,
                                                        anonymousModelHelper, names);

            Name origFieldName = origField.name;
            BVarSymbol immutableFieldSymbol = new BVarSymbol(origField.symbol.flags | Flags.READONLY,
                                                             origFieldName, pkgID, immutableFieldType,
                                                             immutableRecordSymbol);
            if (immutableFieldType.tag == TypeTags.INVOKABLE && immutableFieldType.tsymbol != null) {
                BInvokableTypeSymbol tsymbol = (BInvokableTypeSymbol) immutableFieldType.tsymbol;
                BInvokableSymbol invokableSymbol = (BInvokableSymbol) immutableFieldSymbol;
                invokableSymbol.params = tsymbol.params;
                invokableSymbol.restParam = tsymbol.restParam;
                invokableSymbol.retType = tsymbol.returnType;
                invokableSymbol.flags = tsymbol.flags;
            }
            fields.put(origFieldName.value, new BField(origFieldName, null, immutableFieldSymbol));
            immutableRecordSymbol.scope.define(origFieldName, immutableFieldSymbol);
        }
        return fields;
    }

    private static void setRestType(Types types, SymbolTable symTable, BLangAnonymousModelHelper anonymousModelHelper,
                                    Names names, BRecordType immutableRecordType, BRecordType origRecordType,
                                    DiagnosticPos pos, SymbolEnv env, Set<BType> unresolvedTypes) {
        immutableRecordType.sealed = origRecordType.sealed;

        BType origRestFieldType = origRecordType.restFieldType;

        if (origRestFieldType == null || origRestFieldType == symTable.noType) {
            immutableRecordType.restFieldType = origRestFieldType;
        } else {
            immutableRecordType.restFieldType = setImmutableType(pos, types, origRestFieldType, env, symTable,
                                                                 anonymousModelHelper, names, unresolvedTypes);
        }
    }

    private static BRecordType defineImmutableRecordType(DiagnosticPos pos, BRecordType origRecordType, SymbolEnv env,
                                                         SymbolTable symTable,
                                                         BLangAnonymousModelHelper anonymousModelHelper,
                                                         Names names, Types types, Set<BType> unresolvedTypes) {
        PackageID pkgID = env.enclPkg.symbol.pkgID;
        BRecordTypeSymbol recordSymbol =
                Symbols.createRecordSymbol(origRecordType.tsymbol.flags | Flags.READONLY,
                                           getImmutableTypeName(names, origRecordType.tsymbol),
                                           pkgID, null, env.scope.owner);

        BInvokableType bInvokableType = new BInvokableType(new ArrayList<>(), symTable.nilType, null);
        BInvokableSymbol initFuncSymbol = Symbols.createFunctionSymbol(
                Flags.PUBLIC, Names.EMPTY, env.enclPkg.symbol.pkgID, bInvokableType, env.scope.owner, false);
        initFuncSymbol.retType = symTable.nilType;
        recordSymbol.initializerFunc = new BAttachedFunction(Names.INIT_FUNCTION_SUFFIX, initFuncSymbol,
                                                             bInvokableType);

        recordSymbol.scope = new Scope(recordSymbol);
        recordSymbol.scope.define(
                names.fromString(recordSymbol.name.value + "." + recordSymbol.initializerFunc.funcName.value),
                recordSymbol.initializerFunc.symbol);

        BRecordType immutableRecordType = new BRecordType(recordSymbol, origRecordType.flags | Flags.READONLY);
        origRecordType.immutableType = immutableRecordType;
        immutableRecordType.mutableType = origRecordType;

        immutableRecordType.fields = getImmutableFields(types, symTable, anonymousModelHelper, names,
                                                        immutableRecordType.tsymbol, origRecordType, pos, env,
                                                        pkgID);

        setRestType(types, symTable, anonymousModelHelper, names, immutableRecordType, origRecordType, pos, env,
                    unresolvedTypes);

        recordSymbol.type = immutableRecordType;
        immutableRecordType.tsymbol = recordSymbol;

        BLangRecordTypeNode recordTypeNode = TypeDefBuilderHelper.createRecordTypeNode(immutableRecordType, pkgID,
                                                                                       symTable, pos);
        recordTypeNode.initFunction = TypeDefBuilderHelper.createInitFunctionForRecordType(recordTypeNode, env, names,
                                                                                           symTable);
        TypeDefBuilderHelper.addTypeDefinition(immutableRecordType, recordSymbol, recordTypeNode, env);

        return immutableRecordType;
    }

    private static BTypeSymbol getReadonlyTSymbol(Names names, BTypeSymbol originalTSymbol, SymbolEnv env) {
        return Symbols.createTypeSymbol(originalTSymbol.tag, originalTSymbol.flags | Flags.READONLY,
                                        getImmutableTypeName(names, originalTSymbol), env.enclPkg.symbol.pkgID, null,
                                        env.scope.owner);
    }

    private static Name getImmutableTypeName(Names names, BTypeSymbol originalTSymbol) {
        return names.fromString(originalTSymbol.name.getValue().concat(AND_READONLY_SUFFIX));
    }
}
