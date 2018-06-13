/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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
 *
 */

import React from 'react';
import log from 'log';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { getPathSeperator } from 'api-client/api-client';
import classnames from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ContextMenuTrigger from './../context-menu/ContextMenuTrigger';
import { getContextMenuItems } from './menu';
import { exists, create, move } from './../../workspace/fs-util';
import { COMMANDS as WORKSPACE_CMDS } from './../../workspace/constants';
import { withDragEnabled } from './drag-drop/drag-source';
import { withDropEnabled } from './drag-drop/drop-target';

export const EDIT_TYPES = {
    NEW: 'new',
    RENAME: 'rename',
};

export const NODE_TYPES = {
    FILE: 'file',
    FOLDER: 'folder',
};
// TODO: make supported extensions pluggable
// via editor contributions
const EXT = '.bal';

const ROW_HEIGHT = 26;
/**
 * Class to represent a tree node
 */
class TreeNode extends React.Component {

    /**
     * @inheritdoc
     */
    constructor(...args) {
        super(...args);
        this.state = {
            disableToolTip: false,
            editError: '',
            editTargetExists: false,
            inputValue: this.props.node.label,
        };
        this.errorDiv = undefined;
        this.nameInput = undefined;
        this.focusHighligher = undefined;
        this.nodeRef = undefined;
        this.onEditName = this.onEditName.bind(this);
        this.onEditComplete = this.onEditComplete.bind(this);
        this.treeNodeDiv = undefined;
    }

    /**
     * @inheritdoc
     */
    componentDidMount() {
        if (this.props.node.enableEdit && !_.isNil(this.nameInput)) {
            const { scroller } = this.context;
            this.focusHighligher.style.height = `${scroller.getScrollHeight()}px`;
            scroller.scrollToElement(this.nameInput);
            this.nameInput.focus();
        }
        if (this.props.node.active) {
            this.scrollToNode();
        }
        // Use empty image as a drag preview so browsers don't draw it
        // and we can draw whatever we want on the custom drag layer instead.
        this.props.dragSource.connectDragPreview(getEmptyImage(), {
            // IE fallback: specify that we'd rather screenshot the node
            // when it already knows it's being dragged so we can hide it with CSS.
            captureDraggingState: true,
        });
    }

    /**
     * @inheritdoc
     */
    componentWillReceiveProps(newProps) {
        const {
            expandNode,
            node,
            node: {
                collapsed,
            },
            dropTarget: {
                isOverCurrent,
                canDrop,
            },
        } = this.props;
        if (isOverCurrent && canDrop && collapsed) {
            expandNode(node);
        }
    }

    /**
     * @inheritdoc
     */
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.panelResizeInProgress && nextProps.node.active)
            || !nextProps.panelResizeInProgress;
    }

    /**
     * @inheritdoc
     */
    componentDidUpdate(prevProps, prevState) {
        if (!_.isNil(this.nameInput) && this.state.inputValue === this.props.node.label) {
            this.nameInput.focus();
            if (this.props.node.fileName) {
                this.nameInput.setSelectionRange(0, this.props.node.fileName.length);
            } else {
                this.nameInput.select();
            }
        }
        if (!_.isNil(this.nameInput) && !_.isNil(this.errorDiv)) {
            const { scroller } = this.context;
            // if error div is hidden in screen
            if (!scroller.isElementVisible(this.errorDiv)) {
                scroller.scrollToElement(this.errorDiv);
            }
            this.focusHighligher.style.height = `${scroller.getScrollHeight()}px`;
        }
        if (this.props.node.active) {
            this.scrollToNode();
        }
    }

    /**
     * Upon name modifications
     */
    onEditName(e) {
        const inputValue = e.target.value;
        this.setState({
            inputValue,
        });
        const { parent, id, type } = this.props.node;
        let derrivedName = inputValue;
        // FIXME: Remove redundant logic for adding bal extension implicitly
        if (type === NODE_TYPES.FILE && derrivedName.indexOf('.') === -1 && !_.endsWith(derrivedName, EXT)) {
            derrivedName += EXT;
        }
        const newFullPath = parent + getPathSeperator() + derrivedName;
        if (newFullPath !== id && !_.isEmpty(inputValue)) {
            exists(newFullPath)
            .then((resp) => {
                let editError = '';
                let editTargetExists = false;
                if (resp.exists && (this.props.node.label !== derrivedName)) {
                    editError = `A file or folder "${derrivedName}" already exists at this location.
                    Please choose a different name`;
                    editTargetExists = true;
                }
                this.setState({
                    editError,
                    editTargetExists,
                });
            })
            .catch((error) => {
                log.error(error.message);
                this.setState({
                    editError: error.message,
                });
            });
        } else {
            this.setState({
                editError: _.isEmpty(inputValue) ? 'A file or folder name must be provided.' : '',
                editTargetExists: false,
            });
        }
    }

     /**
     * Upon escaping edit mode
     */
    onEditEscape() {
        const { node, node: { editType, label }, onNodeDelete } = this.props;
        if (editType === EDIT_TYPES.NEW) {
            onNodeDelete(node);
        } else if (editType === EDIT_TYPES.RENAME) {
            node.enableEdit = false;
            this.setState({
                inputValue: label,
            });
        }
    }

    /**
     * Upon name modification completion
     */
    onEditComplete() {
        const { node, node: { id, editType, parent, type }, onNodeDelete } = this.props;
        let newFullPath = parent + getPathSeperator() + this.state.inputValue;
        // Disable adding bal ext automatically to newly created files from explorer
        // if an ext is already given. TODO: Fix this properly by adding a submenu to new-file menu
        // to display all possible file types
        if (type === NODE_TYPES.FILE && newFullPath.indexOf('.') === -1 && !_.endsWith(newFullPath, EXT)) {
            newFullPath += EXT;
        }
        if (_.isEmpty(this.state.inputValue) && editType === EDIT_TYPES.NEW) {
            onNodeDelete(node);
        } else if (!_.isEmpty(this.state.inputValue) && editType === EDIT_TYPES.NEW) {
            if (!this.state.editTargetExists) {
                const content = this.context.editor.getDefaultContent(newFullPath);
                create(newFullPath, type, content)
                    .then((sucess) => {
                        if (sucess) {
                            this.props.onNodeRefresh(this.props.parentNode);
                        }
                    })
                    .catch((error) => {
                        this.setState({
                            editError: error.message,
                        });
                    });
            }
        } else if (!_.isEmpty(this.state.inputValue) && editType === EDIT_TYPES.RENAME) {
            // user didn't change the name, just disable edit mode.
            if (this.state.inputValue === node.label) {
                node.enableEdit = false;
                this.forceUpdate();
            } else {
                move(id, newFullPath)
                    .then((sucess) => {
                        if (sucess) {
                            // if the old file was opened in an editor, close it and reopen a new tab
                            const { editor, command: { dispatch } } = this.context;
                            if (editor.isFileOpenedInEditor(node.id)) {
                                const targetEditor = editor.getEditorByID(node.id);
                                editor.closeEditor(targetEditor);
                                dispatch(WORKSPACE_CMDS.OPEN_FILE, {
                                    filePath: newFullPath,
                                    activate: true,
                                });
                            }
                            this.props.onNodeRefresh(this.props.parentNode);
                        }
                    })
                    .catch((error) => {
                        this.setState({
                            editError: error.message,
                        });
                    });
            }
        }
    }

    /**
     * Scroll to node in tree.
     */
    scrollToNode() {
        if (this.nodeRef && !this.context.scroller.isElementVisible(this.nodeRef)) {
            this.context.scroller.scrollToElement(this.nodeRef);
        }
    }

    /**
     * @inheritdoc
     */
    render() {
        const {
            node,
            node: {
                id,
                active,
                collapsed,
                enableEdit = false,
                editType = EDIT_TYPES.NEW,
                type,
                label,
            },
            parentNode,
            onClick,
            onSelect,
            onDoubleClick,
            children,
            onNodeUpdate,
            onNodeRefresh,
            onNodeDelete,
            readOnly,
            dropTarget: {
                connectDropTarget,
                isOver,
                isOverCurrent,
                canDrop,
                isDragging,
            },
            dragSource: {
                connectDragSource,
                connectDragPreview,
            },
        } = this.props;
        const treeNodeHeader = (
            <div
                data-placement="bottom"
                data-toggle="tooltip"
                title={id}
                className={classnames('tree-node-header', { active })}
                onMouseDown={() => {
                    if (!enableEdit) {
                        onSelect(node);
                    }
                }}
                onClick={() => {
                    if (!enableEdit) {
                        onClick(node);
                    }
                }}
                onDoubleClick={() => {
                    if (!enableEdit) {
                        onDoubleClick(node);
                    }
                }}
                ref={(ref) => {
                    this.nodeRef = ref;
                }}
            >
                <div className="tree-node-highlight-row" />
                {!node.loading && <div className="tree-node-arrow" />}
                {node.loading && <i className="tree-node-loading fw fw-loader4 fw-spin" />}
                <i
                    className={
                        classnames(
                            'tree-node-icon',
                            'fw',
                            { 'fw-folder': type === NODE_TYPES.FOLDER },
                            { 'fw-document': type === NODE_TYPES.FILE }
                        )
                    }
                />
                {enableEdit &&
                    <div
                        className="tree-node-focus-highlighter"
                        onClick={() => {
                            if (!_.isEmpty(this.state.editError)) {
                                this.onEditEscape();
                            } else {
                                this.onEditComplete();
                            }
                        }}
                        ref={(ref) => {
                            this.focusHighligher = ref;
                        }}
                        title=""
                    />
                }
                {enableEdit &&
                    <div className={classnames('tree-node-name-input-wrapper', { error: !_.isEmpty(this.state.editError) })} >
                        <input
                            type="text"
                            className={classnames('tree-node-name-input')}
                            spellCheck={false}
                            value={this.state.inputValue}
                            onChange={this.onEditName}
                            onBlur={this.onEditComplete}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !this.state.editTargetExists) {
                                    this.onEditComplete();
                                } else if (e.key === 'Escape') {
                                    this.onEditEscape();
                                }
                            }}
                            ref={(nameInput) => {
                                this.nameInput = nameInput;
                            }}
                            title=""
                        />
                        {!_.isEmpty(this.state.editError) && this.nameInput &&
                            <div
                                className="tree-node-name-input-error"
                                style={{
                                    top: this.nameInput.offsetTop + this.nameInput.clientHeight,
                                    left: this.nameInput.offsetLeft,
                                    width: this.nameInput.offsetWidth,
                                }}
                                ref={(ref) => {
                                    this.errorDiv = ref;
                                }}
                            >
                                <p
                                    style={{
                                        width: this.nameInput.offsetWidth - 10,
                                    }}
                                >
                                    {this.state.editError}
                                </p>
                            </div>
                        }
                    </div>
                }
                {!enableEdit &&
                    <span className="tree-node-label" >
                        {label}
                    </span>
                }
            </div>
        );
        const treeNodeHeaderWrapped = readOnly ? treeNodeHeader : connectDropTarget(connectDragSource(treeNodeHeader));
        const innerComponents = (
            <div>
                <div
                    className='tree-node-highlight-all-nodes'
                    style={{
                        height: collapsed && children ? ROW_HEIGHT * (children.length + 1) : ROW_HEIGHT,
                    }}
                />
                {!this.props.readOnly && !enableEdit &&
                    <ContextMenuTrigger
                        id={node.id}
                        menu={getContextMenuItems(node, parentNode,
                            this.context.command, onNodeUpdate, onNodeRefresh, this.context)}
                        onShow={() => {
                            this.setState({
                                disableToolTip: true,
                            });
                        }}
                        onHide={() => {
                            this.setState({
                                disableToolTip: false,
                            });
                        }}
                    >
                        {treeNodeHeaderWrapped}
                    </ContextMenuTrigger>
                }
                {(this.props.readOnly || enableEdit) && treeNodeHeaderWrapped}
                <div className='tree-node-children'>
                    {collapsed ? null : children}
                </div>
            </div>
        );
        return (
            <div
                className={classnames('tree-node', 'unseletable-content', {
                    collapsed: node.loading || collapsed,
                    empty: !node.children,
                    'ready-to-drop': isOverCurrent && canDrop,
                })}
                ref={(ref) => {
                    this.treeNodeDiv = ref;
                }}
            >
                {innerComponents}
            </div>
        );
    }

}

TreeNode.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        parent: PropTypes.string,
        collapsed: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        enableEdit: PropTypes.bool,
        active: PropTypes.bool,

    }).isRequired,
    parentNode: PropTypes.objectOf(Object),
    onNodeUpdate: PropTypes.func,
    onNodeDelete: PropTypes.func,
    onNodeRefresh: PropTypes.func,
    readOnly: PropTypes.bool,
    children: PropTypes.node,
    expandNode: PropTypes.func,
    onClick: PropTypes.func,
    onSelect: PropTypes.func,
    onDoubleClick: PropTypes.func,
    panelResizeInProgress: PropTypes.bool,
    dropTarget: PropTypes.shape({
        connectDropTarget: PropTypes.func,
        isOver: PropTypes.bool,
        isOverCurrent: PropTypes.bool,
        canDrop: PropTypes.bool,
        isDragging: PropTypes.bool,
    }).isRequired,
    dragSource: PropTypes.shape({
        connectDragSource: PropTypes.func,
        connectDragPreview: PropTypes.func,
        isDragging: PropTypes.bool,
    }).isRequired,
};

TreeNode.defaultProps = {
    panelResizeInProgress: false,
    readOnly: true,
    onNodeDelete: () => {},
    onNodeUpdate: () => {},
    onNodeRefresh: () => {},
    expandNode: () => {},
    onSelect: () => {},
    onClick: () => {},
    isDOMElementVisible: () => false,
    onDoubleClick: () => {},
};

TreeNode.contextTypes = {
    history: PropTypes.shape({
        put: PropTypes.func,
        get: PropTypes.func,
    }),
    command: PropTypes.shape({
        on: PropTypes.func,
        dispatch: PropTypes.func,
    }),
    scroller: PropTypes.shape({
        getScrollHeight: PropTypes.func.isRequired,
        scrollToElement: PropTypes.func.isRequired,
        isElementVisible: PropTypes.func.isRequired,
    }).isRequired,
    editor: PropTypes.shape({
        isFileOpenedInEditor: PropTypes.func,
        getEditorByID: PropTypes.func,
        setActiveEditor: PropTypes.func,
        getActiveEditor: PropTypes.func,
        getDefaultContent: PropTypes.func,
    }).isRequired,
    alert: PropTypes.shape({
        showInfo: PropTypes.func,
        showSuccess: PropTypes.func,
        showWarning: PropTypes.func,
        showError: PropTypes.func,
        closeEditor: PropTypes.func,
    }).isRequired,
};

export default withDropEnabled(withDragEnabled(TreeNode));
