DevExpress.localization.locale('pt');

DevExpress.config({
    editorStylingMode: 'underlined' //'filled' or 'outlined' | 'underlined'
});

const Neurofibromatose = (() => {

  const _neurofibromatoseContent = $('#neurofibromatose-content')
  const _formDefinition = formDefinition

  const init = () => {
    preload();
    _buildFormSections(_formDefinition.form_sections)
  }

  const preload = () => {
    
  }


  const _buildFormSections = (sections) => {
    sections.forEach(section => {
      _neurofibromatoseContent.append(_buildSection(section))
    })
  }

  const _buildSection = (section) => {
    const sectionContainer = $(`<div id="section-id-${section.section_id}">`, {})

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

  return {
    init
  }
})()


document.addEventListener('DOMContentLoaded', () => {
  Neurofibromatose.init()
})