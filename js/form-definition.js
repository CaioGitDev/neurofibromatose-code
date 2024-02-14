const formDefinition = {
  "form_code": "xpto",
  "form_name": "Neurofibromatose tipo 1",
  "form_description": "Formulario de teste para a multidisciplinar",
  "form_sections": [
    {
      "section_id": 1,
      "section_name": "Clinical Identification",
      "section_description": "Identificação Clinica",
      "section_order": 1,
      "section_fields": [
        {
          "field_name": "sns_number",
          "field_description": "Número do SNS",
          "field_options": {
            "type": "dxNumberBox",
            "required": true,
            "read_only": false,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "process_number",
          "field_description": "Número de Processo",
          "field_options": {
            "type": "dxNumberBox",
            "required": true,
            "read_only": false,
            "visible": true,
            "context": null,
            "controller": null
          }
        }
      ]
    },
    {
      "section_id": 2,
      "section_name": "Patient Identification",
      "section_description": "Identificação do Paciente",
      "section_order": 2,
      "section_fields": []
    }
  ]
}