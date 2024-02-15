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
            "read_only": true,
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
            "read_only": true,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "family_number",
          "field_description": "Número família IPO",
          "field_options": {
            "type": "dxNumberBox",
            "required": false,
            "read_only": false,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "chln_number",
          "field_description": "Número CHLN",
          "field_options": {
            "type": "dxNumberBox",
            "required": false,
            "read_only": false,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "chlc_number",
          "field_description": "Número CHLC",
          "field_options": {
            "type": "dxNumberBox",
            "required": false,
            "read_only": false,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "chlo_number",
          "field_description": "Número CHLO",
          "field_options": {
            "type": "dxNumberBox",
            "required": false,
            "read_only": false,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "pg_number",
          "field_description": "Número Pg",
          "field_options": {
            "type": "dxNumberBox",
            "required": false,
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
      "section_fields": [
        {
          "field_name": "patient_name",
          "field_description": "Nome",
          "field_options": {
            "type": "dxTextBox",
            "required": true,
            "read_only": true,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "patient_birth_date",
          "field_description": "Data Nascimento",
          "field_options": {
            "type": "dxDateBox",
            "required": true,
            "read_only": true,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "patient_age",
          "field_description": "Idade",
          "field_options": {
            "type": "dxNumberBox",
            "required": true,
            "read_only": true,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "patient_place_of_birth",
          "field_description": "Naturalidade",
          "field_options": {
            "type": "dxTextBox",
            "required": false,
            "read_only": false,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "patient_race_id",
          "field_description": "Raça",
          "field_options": {
            "type": "dxSelectBox",
            "required": true,
            "read_only": false,
            "visible": true,
            "context": raceList,
            "controller": null
          }
        },
        {
          "field_name": "patient_profession",
          "field_description": "Profissão",
          "field_options": {
            "type": "dxTextBox",
            "required": false,
            "read_only": false,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "patient_education_id",
          "field_description": "Escolaridade",
          "field_options": {
            "type": "dxSelectBox",
            "required": true,
            "read_only": false,
            "visible": true,
            "context": educationLevelList,
            "controller": null
          }
        },
        {
          "field_name": "patient_phone",
          "field_description": "Telefone",
          "field_options": {
            "type": "dxNumberBox",
            "required": true,
            "read_only": true,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "patient_email",
          "field_description": "E-mail",
          "field_options": {
            "type": "dxTextBox",
            "required": false,
            "read_only": false,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "patient_address",
          "field_description": "Morada",
          "field_options": {
            "type": "dxTextBox",
            "required": false,
            "read_only": true,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "patient_referral",
          "field_description": "Referenciação",
          "field_options": {
            "type": "dxTextArea",
            "required": true,
            "read_only": false,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
        {
          "field_name": "patient_reason",
          "field_description": "Motivo",
          "field_options": {
            "type": "dxTextArea",
            "required": true,
            "read_only": false,
            "visible": true,
            "context": null,
            "controller": null
          }
        },
      ]
    }
  ]
}