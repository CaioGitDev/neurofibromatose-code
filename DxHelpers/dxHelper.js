const DxHelper = (function () {

    // ##################################################################################################
    // DATA GRID HELPERS
    // ##################################################################################################
    function buildDataGridFormItemsDefinition(dataGridDefinitionFormItems, columnsToHide) {
        let formItems = [];

        for (const [key, fieldOptions] of Object.entries(dataGridDefinitionFormItems)) {
            if (key === 'empty') {
                formItems.push({ itemType: 'empty' });
            } else {
                let field = {
                    dataField: key,
                    editorType: fieldOptions.type,
                    colSpan: fieldOptions?.colSpan ?? 1,
                    visible: !columnsToHide.includes(key),
                    label: {
                        text: fieldOptions.name,
                    },

                };

                if (fieldOptions.type === 'dxTextArea')
                    field.colSpan = 2

                switch (fieldOptions.type) {
                    case 'dxNumberBox':
                        field.editorOptions = {
                            //min: 0,
                            value: null
                        }
                        break;
                    case 'dxCheckBox':
                        field.editorOptions = {
                        }
                        break;
                    case 'dxTextBox':
                        field.editorOptions = {
                        }
                        break;
                    case 'dxTextArea':
                        field.editorOptions = {
                        }
                        break;
                    case 'dxSelectBox':
                        field.editorOptions = {
                            placeholder: `Selecionar ${fieldOptions.name}`,
                            displayExpr: fieldOptions.displayExpr ?? 'value',
                            valueExpr: fieldOptions.valueExpr ?? 'id',
                            key: 'id',
                            selectByClick: true,
                            showClearButton: true,
                        }
                        break;
                    case 'dxDateBox':
                        if (fieldOptions?.withHours) {
                            field.editorOptions = {
                                openOnFieldClick: true,
                                type: 'datetime',
                                displayFormat: 'dd-MM-yyyy HH:mm:ss',
                                formatString: 'dd-MM-yyyy  HH:mm:ss',
                            }
                        } else {
                            field.editorOptions = {
                                openOnFieldClick: true,
                                type: 'date',
                                displayFormat: 'dd-MM-yyyy',
                                formatString: 'dd-MM-yyyy',
                            }
                        }

                        break;
                    case 'dxRadioGroup':
                        field.editorOptions = {
                            valueExpr: 'id',
                            displayExpr: 'value',
                            layout: 'horizontal',
                        }
                        break;
                    case 'dxTagBox':
                        field.editorOptions = {
                            placeholder: `Selecionar meses`,
                            displayExpr: 'value',
                            valueExpr: 'id',
                        }
                        break;
                    default:
                        break;
                }

                // define custom items
                if (fieldOptions?.items) {
                    field.editorOptions.items = fieldOptions.items;
                }

                // define field read only
                if (fieldOptions?.readOnly) {
                    field.editorOptions.readOnly = fieldOptions.readOnly;
                }

                // define field read only
                if (fieldOptions?.disabled) {
                    field.editorOptions.disabled = fieldOptions.disabled;
                }

                // define default fieldOptions
                // define field read only
                if (fieldOptions?.value) {
                    field.editorOptions.value = fieldOptions.value;
                }

                // defines datasource for list field
                if (fieldOptions?.context) {
                    if (fieldOptions?.controller) {
                        field.editorOptions.dataSource = DevExpress.data.AspNet.createStore({
                            key: "id",
                            loadMode: 'raw',
                            loadUrl: `${serverOptions.baseUrl}${serverOptions.apiEndpoint}/${fieldOptions.controller}/${fieldOptions.context}`,
                            onBeforeSend(method, ajaxOptions) {

                                ajaxOptions.xhrFields = { withCredentials: true };
                            },
                        })
                    } else {
                        field.editorOptions.dataSource = fieldOptions.context;
                    }
                } else if (fieldOptions?.controller) {
                    field.editorOptions.dataSource = DevExpress.data.AspNet.createStore({
                        key: "id",
                        loadMode: 'raw',
                        loadUrl: `${serverOptions.baseUrl}${serverOptions.apiEndpoint}/${fieldOptions.controller}`,
                        onBeforeSend(method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true };
                        },
                    })
                }

                // defines field required
                if (fieldOptions?.required) {
                    field.validationRules = [{
                        type: "required",
                        message: `${fieldOptions.name} é obrigatório`
                    }];
                }

                // defines field format
                if (fieldOptions?.format) {
                    field.editorOptions.format = fieldOptions.format;
                }

                // defines custom validation rules 
                if (fieldOptions?.validationRules) {
                    if (field?.validationRules) {
                        field.validationRules.push(fieldOptions.validationRules)
                    } else {
                        field.validationRules = [fieldOptions.validationRules]
                    }
                }


                // handle on value change if needs to update form
                if (fieldOptions?.updateOnValueChange) {
                    field.editorOptions.onValueChanged = function (e) {
                        fieldOptions.updateOnValueChange(key, e);
                    }
                }

                // handle on focus changed
                if (fieldOptions?.onFocusOut) {
                    field.editorOptions.onFocusOut = function (e) {
                        fieldOptions.onFocusOut(e);
                    }
                }


                if (fieldOptions?.fieldSideEffects) {
                    const lastIndex = fieldOptions.fieldSideEffects.length - 1;
                    const formId = fieldOptions.fieldSideEffects[lastIndex];
                    fieldOptions.fieldSideEffects.pop();

                    field.editorOptions.onValueChanged = function (e) {
                        const selectedValue = e.value === 1 ? true : false;

                        fieldOptions.fieldSideEffects.forEach((field) => {
                            const form = getDxFormInstanceByName(formId);
                            const editor = form.getEditor(field);
                            editor.option('readOnly', !selectedValue);
                        })

                    }
                }

                formItems.push(field);
            }
        }

        return formItems;
    }

    function buildDataGridColumnDefinition(dataGridDefinitionColumns, columnsToHide) {
        let columns = [];

        for (const [key, value] of Object.entries(dataGridDefinitionColumns)) {
            let columnOptions = null;

            switch (value.type) {
                case 'string':
                    columnOptions = {
                        dataField: key,
                        caption: value.name,
                        visible: !columnsToHide.includes(key)
                    };
                    break;
                case 'money':
                    columnOptions = {
                        dataField: key,
                        caption: value.name,
                        visible: !columnsToHide.includes(key),
                        format: { type: 'currency', currency: 'EUR', precision: 2 }
                    };
                    break;
                case 'boolean':
                    columnOptions = {
                        dataField: key,
                        caption: value.name,
                        visible: !columnsToHide.includes(key)
                    };
                    break;
                case 'datetime':
                    columnOptions = {
                        dataField: key,
                        caption: value.name,
                        visible: !columnsToHide.includes(key),
                        dataType: 'date',
                        format: "dd-MM-yyyy",
                    };
                    break;
                case 'lookup':
                    columnOptions = {
                        dataField: key,
                        caption: value.name,
                        visible: !columnsToHide.includes(key),
                        lookup: {
                            displayExpr: value.displayExpr ?? 'value',
                            valueExpr: value.valueExpr ?? 'id',
                        },
                    }
                default:
                    break;
            }

            // defines datasource for list field
            if (value?.context) {


                if (value?.controller) {
                    columnOptions.lookup.dataSource = DevExpress.data.AspNet.createStore({
                        key: "id",
                        loadMode: 'raw',
                        loadUrl: `${serverOptions.baseUrl}${serverOptions.apiEndpoint}/${value.controller}/${value.context}`,
                        onBeforeSend(method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true };
                        },
                    })
                } else {
                    columnOptions.lookup.dataSource = value.context;
                }
            } else if (value?.controller) {
                columnOptions.lookup.dataSource = DevExpress.data.AspNet.createStore({
                    key: "id",
                    loadMode: 'raw',
                    loadUrl: `${serverOptions.baseUrl}${serverOptions.apiEndpoint}/${value.controller}`,
                    onBeforeSend(method, ajaxOptions) {
                        ajaxOptions.xhrFields = { withCredentials: true };
                    },
                })
            }

            if (value?.groupIndex !== undefined) {
                columnOptions.groupIndex = value.groupIndex;
            }

            if (value?.setCellValue) {
                columnOptions.setCellValue = value.setCellValue;
            }


            columns.push(columnOptions)
        }

        return columns;
    }

    return {
        buildDataGridFormItemsDefinition,
        buildDataGridColumnDefinition
    }
})();

/// GETS

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const getdxFormValue = function (instance, field) {
    return instance.getEditor(field).option('value');
};

const getDxFormEditor = function (formName, formEditor) {
    return $('#' + formName).dxForm('instance').getEditor(formEditor);
}

const getDxFormInstanceByName = function (formName) {
    return $('#' + formName).dxForm('instance');
}

const getGridRowByKey = function (dataGridName, key) {
    let grid = $("#" + dataGridName).dxDataGrid('instance');
    let rows = grid.getVisibleRows();
    let rowIndex = grid.getRowIndexByKey(key);
    let row = rows[rowIndex];

    return row.data;
}

/// SETS
const setDxComponentOptions = function (component, options) {
    component.option(options);
}

const setDxFormValue = function (instance, dataField, fieldValue) {
    return instance.getEditor(dataField).option('value', fieldValue);
};

const setDxFormEditorOption = function (instance, editorName, option, optionValue) {
    return instance.getEditor(editorName).option(option, optionValue);
};