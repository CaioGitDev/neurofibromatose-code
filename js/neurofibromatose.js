DevExpress.localization.locale('pt');

DevExpress.config({
  editorStylingMode: 'underlined' //'filled' or 'outlined' | 'underlined'
});

const loadPanel = $('.load-panel').dxLoadPanel({
  shadingColor: 'rgba(0,0,0,0.4)',
  position: { of: '#form1' },
  visible: false,
  showIndicator: true,
  showPane: true,
  shading: true,
  closeOnOutsideClick: false
}).dxLoadPanel('instance');

const Neurofibromatose = (() => {

  const _neurofibromatoseContent = $('#neurofibromatose-content')
  const _formDefinition = formDefinition
  let _processNumber = null

  const init = () => {
    preload();
    _buildFormSections(_formDefinition.form_sections)
  }

  const preload = () => {
    checkUrlParams();
    checkIfProcessIsValid();
  }

  const checkUrlParams = () => {
    // get from url query string http://127.0.0.1:5500/?process_number=1214299
    const urlParams = new URLSearchParams(window.location.search);
    const processNumber = urlParams.get('process_number');

    if (!processNumber)
      window.location.href = 'index.html';

    _processNumber = processNumber;
  }

  const checkIfProcessIsValid = async () => {
    loadPanel.show();
    const patientData = await getPatientDataAsync(_processNumber);

    if (!patientData) {
      //window.location.href = 'index.html';
    }

    $("#section-id-1").dxForm("instance").option("formData", {
      sns_number: patientData.sns_number,
      process_number: patientData.process_number,
    });

    $("#section-id-2").dxForm("instance").option("formData", {
      patient_name: patientData.patient_name,
      patient_birth_date: patientData.patient_birth_date,
      patient_age: patientData.patient_age,
      patient_phone: patientData.patient_phone,
      patient_address: patientData.patient_address,
    });

    loadPanel.hide();
  }

  const getPatientDataAsync = (processNumber) => {
    // simulate async call and return a promise object
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          sns_number: 123456789,
          process_number: 1214299,
          patient_name: 'João Silva',
          patient_birth_date: new Date(1980, 10, 10),
          patient_age: 40,
          patient_phone: 123456789,
          patient_address: 'Rua do Ouro, 123',
        })
      }), 5000
    });
  }

  const _buildFormSections = (sections) => {
    sections.forEach(section => {
      _neurofibromatoseContent.append(_buildSection(section))
    })
  }

  const _buildSection = (section) => {
    const sectionContainer = $(`<div id="section-id-${section.section_id}">
    <h1>${section.section_description}</h1>
    </div>`, {})


    switch (section.section_type) {
      case 'dxForm':
        sectionContainer.dxForm({
          labelLocation: 'top',
          colCount: 2,
          colSpan: 2,
          showColonAfterLabel: true,
          showValidationSummary: true,
          formData: {},
          items: [{
            itemType: 'group',
            caption: section.section_description,
            colCount: 2,
            colSpan: 2,
            items: _buildField(section.section_fields)
          }]
        }).dxForm('instance')
        break
      case 'dxDataGrid':
        sectionContainer.dxDataGrid({
          dataSource: [],
          keyExpr: 'id',
          showBorders: true,
          columns: _buildColumnsFields(section.section_fields),
          editing: {
            mode: 'popup',
            allowUpdating: true,
            allowAdding: true,
            allowDeleting: false,
            popup: {
              title: `Adicionar / Editar ${section.section_description}`,
              showTitle: true,
              width: '50vw',
              height: '60vh',
            },
            form: {
              labelLocation: 'top',
              colCount: 1,
              colSpan: 1,
              showColonAfterLabel: true,
              showValidationSummary: true,
              items: _buildField(section.section_fields)
            }
          },
          toolbar: {
            items: [
              {
                location: 'before',
                template() {
                  return $('<div>')
                    .addClass('dx-form-group-with-caption dx-form-group dx-group-colcount-2')
                    .append(
                      $('<span>')
                      .addClass('dx-form-group-caption')
                        .text(section.section_description),
                    );
                },
              },
              {
                location: 'after',
                widget: 'dxButton',
                options: {
                  icon: 'refresh',
                  onClick() {
                    $(`#section-id-${section.section_id}`).dxDataGrid('instance').refresh();
                  },
                },
              },
              {
                location: 'after',
                widget: 'dxButton',
                name: 'addRowButton',
                showText: "always",
                options: {
                  icon: 'add',
                  text: 'Adicionar Antecente'
                }
              }
            ]
          },
        }).dxDataGrid('instance')
        break
    }



    return sectionContainer
  }

  const _buildField = (section_fields) => {
    let columnsToHide = []
    const fields = {}
    section_fields.forEach(field => {
      fields[field.field_name] = {
        name: field.field_description,
        type: field.field_options.type,
        required: field.field_options.required,
        context: field.field_options.context,
        controller: field.field_options.controller,
        readOnly: field.field_options.read_only,
        disabled: field.field_options.disabled,
      }
      if (!field.field_options.visible) {
        columnsToHide.push(field.field_name)
      }
    })

    return DxHelper.buildDataGridFormItemsDefinition(fields, columnsToHide)
  }

  const _buildColumnsFields = (section_fields) => {
    let columnsToHide = []
    const fields = {}
    section_fields.forEach(field => {
      fields[field.field_name] = {
        name: field.field_description,
        type: field.field_options.type === 'dxDateBox' ? 'datetime' :
          field.field_options.type === 'dxSelectBox' ? 'lookup' :
            'string',
        context: field.field_options.context,
        controller: field.field_options.controller,
      }
      if (!field.field_options.visible) {
        columnsToHide.push(field.field_name)
      }
    })

    console.log(DxHelper.buildDataGridColumnDefinition(fields, columnsToHide))
    return DxHelper.buildDataGridColumnDefinition(fields, columnsToHide)
  }

  const _LoadPanel = () => {
    return _loadPanel.dxLoadPanel({
      position: {
        of: _neurofibromatoseContent
      },
      visible: false,
      shadingColor: 'rgba(0,0,0,0.4)',
      showIndicator: true,
      showPane: true,
      shading: true,
      closeOnOutsideClick: false
    }).dxLoadPanel('instance')
  }

  return {
    init
  }
})()


document.addEventListener('DOMContentLoaded', () => {
  Neurofibromatose.init()
})