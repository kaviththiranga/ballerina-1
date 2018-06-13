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
import log from 'log';
import { DragSource } from 'react-dnd';
import { ITEM_TYPES } from './constants';

/**
 * Enable drag on given compenent
 *
 * @param {Componet} TreeNode React Component for Tree Node
 *
 */
export function withDragEnabled(TreeNode) {
    // drag source spec
    const dragSpec = {
        beginDrag: (props, monitor, component) => {
            const { node } = props;
            return {
                node,
            };
        },
        endDrag: (props, monitor, component) => {
            if (monitor.didDrop()) {
                const { node } = monitor.getItem();
                const droppedTarget = monitor.getDropResult().node;
                debugger;
            }
        },
    };

    // Specifies which props to inject into component
    function collect(connect, monitor) {
        return {
            dragSource: {
                connectDragSource: connect.dragSource(),
                connectDragPreview: connect.dragPreview(),
                isDragging: monitor.isDragging(),
            },
        };
    }
    return DragSource(ITEM_TYPES.FILE_TREE_NODE, dragSpec, collect)(TreeNode);
}
