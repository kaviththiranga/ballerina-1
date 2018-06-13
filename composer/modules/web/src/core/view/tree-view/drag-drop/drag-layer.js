/**
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import classnames from 'classnames';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    color: 'black',
};

const blockStyles = {
    position: 'relative',
    left: -24,
};

function getItemStyles(props, isOverTarget, canDropToTarget) {
    const { currentOffset } = props;
    if (!currentOffset) {
        return {
            display: 'none',
        };
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x + 10}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
        opacity: isOverTarget && canDropToTarget ? 1 : 0.8,
        cursor: canDropToTarget ? 'pointer' : 'no-drop',
    };
}

class FileNodeDragLayer extends React.Component {
    render() {
        if (!this.props.isDragging) {
            return null;
        }
        const { isOverTarget, canDropToTarget } = this.props.getCurrentTargetInfo();
        const { item: { node: { label, type } } } = this.props;
        return (
            <div style={layerStyles}>
                <div style={getItemStyles(this.props, isOverTarget, canDropToTarget)}>
                    <span
                        style={{
                            background: 'white',
                            color: '#383838',
                            display: 'inline-block',
                            padding: '2px 4px',
                            verticalAlign: 'middle',
                        }}
                    >
                        <span
                            style={{
                                verticalAlign: 'middle',
                                marginRight: 5,
                            }}
                        >
                            <i
                                className={
                                    classnames(
                                        'fw',
                                        { 'fw-folder': type === 'folder' },
                                        { 'fw-document': type === 'file' }
                                    )
                                }
                            />
                        </span>
                        <span>{label}</span>
                    </span>
                    {(isOverTarget && !canDropToTarget) &&
                        <i style={{ color: 'red' }} className='/** TODO **/' />
                    }
                </div>
            </div>
        );
    }
}

FileNodeDragLayer.propTypes = {
    item: PropTypes.objectOf(Object),
    currentOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    isDragging: PropTypes.bool.isRequired,
    getCurrentTargetInfo: PropTypes.func.isRequired,
};

function collect(monitor) {
    return {
        item: monitor.getItem(),
        currentOffset: monitor.getClientOffset(),
        isDragging: monitor.isDragging(),
        getCurrentTargetInfo: () => {
            const targetIds = monitor.isDragging() ? monitor.getTargetIds() : [];
            let isOverTarget = false;
            let canDropToTarget = false;
            for (let i = targetIds.length - 1; i >= 0; i--) {
                if (monitor.isOverTarget(targetIds[i])) {
                    isOverTarget = true;
                    canDropToTarget = monitor.canDropOnTarget(targetIds[i]);
                    break;
                }
            }
            return {
                isOverTarget,
                canDropToTarget,
            };
        },
    };
}

export default DragLayer(collect)(FileNodeDragLayer);
