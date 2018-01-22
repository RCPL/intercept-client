import { Schema } from '@orbit/data';
const schemaDefinition = {
  "models": {
    "block_content--basic": {
      "attributes": {
        "id": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "revision_id": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "info": {
          "type": "string"
        },
        "revision_log": {
          "type": "string"
        },
        "changed": {
          "type": "number"
        },
        "revision_created": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "body": {
          "type": "object"
        }
      },
      "relationships": {
        "type": {
          "type": "hasOne",
          "model": "block_content_type--block_content_type"
        },
        "revision_user": {
          "type": "hasOne",
          "model": "user--user"
        }
      }
    },
    "consumer--consumer": {
      "attributes": {
        "id": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "third_party": {
          "type": "boolean"
        },
        "secret": {
          "type": "object"
        },
        "confidential": {
          "type": "boolean"
        }
      },
      "relationships": {
        "owner_id": {
          "type": "hasOne",
          "model": "user--user"
        },
        "image": {
          "type": "hasOne",
          "model": "file--file"
        },
        "roles": {
          "type": "hasMany",
          "model": "user_role--user_role"
        }
      }
    },
    "contact_message--feedback": {
      "attributes": {
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "mail": {
          "type": "string"
        },
        "subject": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "copy": {
          "type": "boolean"
        }
      },
      "relationships": {
        "contact_form": {
          "type": "hasOne",
          "model": "contact_form--contact_form"
        },
        "recipient": {
          "type": "hasOne",
          "model": "user--user"
        }
      }
    },
    "contact_message--personal": {
      "attributes": {
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "mail": {
          "type": "string"
        },
        "subject": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "copy": {
          "type": "boolean"
        }
      },
      "relationships": {
        "contact_form": {
          "type": "hasOne",
          "model": "contact_form--contact_form"
        },
        "recipient": {
          "type": "hasOne",
          "model": "user--user"
        }
      }
    },
    "evaluation_criteria--evaluation_criteria": {
      "attributes": {
        "id": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "vid": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "revision_created": {
          "type": "number"
        },
        "revision_log_message": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "evaluation": {
          "type": "integer"
        },
        "status": {
          "type": "boolean"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "default_langcode": {
          "type": "boolean"
        }
      },
      "relationships": {
        "revision_user": {
          "type": "hasOne",
          "model": "user--user"
        },
        "user_id": {
          "type": "hasOne",
          "model": "user--user"
        }
      }
    },
    "file--file": {
      "attributes": {
        "fid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "filename": {
          "type": "string"
        },
        "uri": {
          "type": "uri"
        },
        "filemime": {
          "type": "string"
        },
        "filesize": {
          "type": "integer"
        },
        "status": {
          "type": "boolean"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "url": {
          "type": "string"
        }
      },
      "relationships": {
        "uid": {
          "type": "hasOne",
          "model": "user--user"
        }
      }
    },
    "event_recurrence--event_recurrence": {
      "attributes": {
        "id": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "vid": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "revision_created": {
          "type": "number"
        },
        "revision_log_message": {
          "type": "string"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        }
      },
      "relationships": {
        "revision_user": {
          "type": "hasOne",
          "model": "user--user"
        },
        "user_id": {
          "type": "hasOne",
          "model": "user--user"
        }
      }
    },
    "media--file": {
      "attributes": {
        "mid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "vid": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "revision_created": {
          "type": "number"
        },
        "revision_log_message": {
          "type": "string"
        },
        "status": {
          "type": "boolean"
        },
        "name": {
          "type": "string"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        }
      },
      "relationships": {
        "bundle": {
          "type": "hasOne",
          "model": "media_type--media_type"
        },
        "revision_user": {
          "type": "hasOne",
          "model": "user--user"
        },
        "thumbnail": {
          "type": "hasOne",
          "model": "file--file"
        },
        "uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "field_media_file": {
          "type": "hasOne",
          "model": "file--file"
        }
      }
    },
    "media--image": {
      "attributes": {
        "mid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "vid": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "revision_created": {
          "type": "number"
        },
        "revision_log_message": {
          "type": "string"
        },
        "status": {
          "type": "boolean"
        },
        "name": {
          "type": "string"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        },
        "field_media_caption": {
          "type": "object"
        },
        "field_media_credit": {
          "type": "object"
        }
      },
      "relationships": {
        "bundle": {
          "type": "hasOne",
          "model": "media_type--media_type"
        },
        "revision_user": {
          "type": "hasOne",
          "model": "user--user"
        },
        "thumbnail": {
          "type": "hasOne",
          "model": "file--file"
        },
        "uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "field_media_image": {
          "type": "hasOne",
          "model": "file--file"
        }
      }
    },
    "media--slideshow": {
      "attributes": {
        "mid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "vid": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "revision_created": {
          "type": "number"
        },
        "revision_log_message": {
          "type": "string"
        },
        "status": {
          "type": "boolean"
        },
        "name": {
          "type": "string"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        }
      },
      "relationships": {
        "bundle": {
          "type": "hasOne",
          "model": "media_type--media_type"
        },
        "revision_user": {
          "type": "hasOne",
          "model": "user--user"
        },
        "thumbnail": {
          "type": "hasOne",
          "model": "file--file"
        },
        "uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "field_media_slideshow": {
          "type": "hasMany",
          "model": "media--image"
        }
      }
    },
    "media--web_video": {
      "attributes": {
        "mid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "vid": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "revision_created": {
          "type": "number"
        },
        "revision_log_message": {
          "type": "string"
        },
        "status": {
          "type": "boolean"
        },
        "name": {
          "type": "string"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        },
        "field_media_caption": {
          "type": "object"
        },
        "field_media_video_embed_field": {
          "type": "string"
        }
      },
      "relationships": {
        "bundle": {
          "type": "hasOne",
          "model": "media_type--media_type"
        },
        "revision_user": {
          "type": "hasOne",
          "model": "user--user"
        },
        "thumbnail": {
          "type": "hasOne",
          "model": "file--file"
        },
        "uid": {
          "type": "hasOne",
          "model": "user--user"
        }
      }
    },
    "node--equipment": {
      "attributes": {
        "nid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "vid": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "revision_timestamp": {
          "type": "number"
        },
        "revision_log": {
          "type": "string"
        },
        "status": {
          "type": "boolean"
        },
        "title": {
          "type": "string"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "promote": {
          "type": "boolean"
        },
        "sticky": {
          "type": "boolean"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        },
        "field_duration_min": {
          "type": "string"
        },
        "field_text_content": {
          "type": "object"
        }
      },
      "relationships": {
        "type": {
          "type": "hasOne",
          "model": "node_type--node_type"
        },
        "revision_uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "field_equipment_type": {
          "type": "hasOne",
          "model": "taxonomy_term--equipment_type"
        },
        "field_image_primary": {
          "type": "hasOne",
          "model": "media--image"
        }
      }
    },
    "node--event": {
      "attributes": {
        "nid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "vid": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "revision_timestamp": {
          "type": "number"
        },
        "revision_log": {
          "type": "string"
        },
        "status": {
          "type": "boolean"
        },
        "title": {
          "type": "string"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "promote": {
          "type": "boolean"
        },
        "sticky": {
          "type": "boolean"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        },
        "field_capacity_max": {
          "type": "integer"
        },
        "field_date_time": {
          "type": "object"
        },
        "field_event_is_template": {
          "type": "boolean"
        },
        "field_has_waitlist": {
          "type": "boolean"
        },
        "field_must_register": {
          "type": "boolean"
        },
        "field_text_content": {
          "type": "object"
        },
        "field_text_intro": {
          "type": "object"
        },
        "field_text_teaser": {
          "type": "string"
        }
      },
      "relationships": {
        "type": {
          "type": "hasOne",
          "model": "node_type--node_type"
        },
        "revision_uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "field_event_recurrence": {
          "type": "hasOne",
          "model": "event_recurrence--event_recurrence"
        },
        "field_event_series": {
          "type": "hasOne",
          "model": "node--event_series"
        },
        "field_event_subject_heading": {
          "type": "hasMany",
          "model": "taxonomy_term--lc_subject"
        },
        "field_event_tags": {
          "type": "hasMany",
          "model": "taxonomy_term--tag"
        },
        "field_event_type": {
          "type": "hasMany",
          "model": "taxonomy_term--event_type"
        },
        "field_image_primary": {
          "type": "hasOne",
          "model": "media--image"
        },
        "field_room": {
          "type": "hasOne",
          "model": "node--room"
        }
      }
    },
    "node--event_series": {
      "attributes": {
        "nid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "vid": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "revision_timestamp": {
          "type": "number"
        },
        "revision_log": {
          "type": "string"
        },
        "status": {
          "type": "boolean"
        },
        "title": {
          "type": "string"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "promote": {
          "type": "boolean"
        },
        "sticky": {
          "type": "boolean"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        }
      },
      "relationships": {
        "type": {
          "type": "hasOne",
          "model": "node_type--node_type"
        },
        "revision_uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "uid": {
          "type": "hasOne",
          "model": "user--user"
        }
      }
    },
    "node--location": {
      "attributes": {
        "nid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "vid": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "revision_timestamp": {
          "type": "number"
        },
        "revision_log": {
          "type": "string"
        },
        "status": {
          "type": "boolean"
        },
        "title": {
          "type": "string"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "promote": {
          "type": "boolean"
        },
        "sticky": {
          "type": "boolean"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        },
        "field_address": {
          "type": "object"
        },
        "field_contact_number": {
          "type": "string"
        },
        "field_location_hours": {
          "type": "array"
        },
        "field_map_link": {
          "type": "object"
        },
        "field_text_content": {
          "type": "object"
        },
        "field_text_intro": {
          "type": "object"
        }
      },
      "relationships": {
        "type": {
          "type": "hasOne",
          "model": "node_type--node_type"
        },
        "revision_uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "field_image_primary": {
          "type": "hasOne",
          "model": "media--image"
        }
      }
    },
    "node--page": {
      "attributes": {
        "nid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "vid": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "revision_timestamp": {
          "type": "number"
        },
        "revision_log": {
          "type": "string"
        },
        "status": {
          "type": "boolean"
        },
        "title": {
          "type": "string"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "promote": {
          "type": "boolean"
        },
        "sticky": {
          "type": "boolean"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        },
        "body": {
          "type": "object"
        }
      },
      "relationships": {
        "type": {
          "type": "hasOne",
          "model": "node_type--node_type"
        },
        "revision_uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "uid": {
          "type": "hasOne",
          "model": "user--user"
        }
      }
    },
    "node--room": {
      "attributes": {
        "nid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "vid": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "revision_timestamp": {
          "type": "number"
        },
        "revision_log": {
          "type": "string"
        },
        "status": {
          "type": "boolean"
        },
        "title": {
          "type": "string"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "promote": {
          "type": "boolean"
        },
        "sticky": {
          "type": "boolean"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        },
        "field_capacity_max": {
          "type": "integer"
        },
        "field_capacity_min": {
          "type": "integer"
        },
        "field_room_equipment": {
          "type": "object"
        },
        "field_room_fees": {
          "type": "object"
        },
        "field_staff_use_only": {
          "type": "boolean"
        },
        "field_text_content": {
          "type": "object"
        },
        "field_text_intro": {
          "type": "object"
        },
        "field_text_teaser": {
          "type": "string"
        }
      },
      "relationships": {
        "type": {
          "type": "hasOne",
          "model": "node_type--node_type"
        },
        "revision_uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "field_image_primary": {
          "type": "hasOne",
          "model": "media--image"
        },
        "field_location": {
          "type": "hasOne",
          "model": "node--location"
        },
        "field_room_type": {
          "type": "hasOne",
          "model": "taxonomy_term--room_type"
        }
      }
    },
    "shortcut--default": {
      "attributes": {
        "id": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "title": {
          "type": "string"
        },
        "weight": {
          "type": "integer"
        },
        "link": {
          "type": "object"
        },
        "default_langcode": {
          "type": "boolean"
        }
      },
      "relationships": {
        "shortcut_set": {
          "type": "hasOne",
          "model": "shortcut_set--shortcut_set"
        }
      }
    },
    "oauth2_token--access_token": {
      "attributes": {
        "id": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "value": {
          "type": "string"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "expire": {
          "type": "number"
        },
        "status": {
          "type": "boolean"
        }
      },
      "relationships": {
        "bundle": {
          "type": "hasOne",
          "model": "oauth2_token_type--oauth2_token_type"
        },
        "auth_user_id": {
          "type": "hasOne",
          "model": "user--user"
        },
        "client": {
          "type": "hasOne",
          "model": "consumer--consumer"
        },
        "scopes": {
          "type": "hasMany",
          "model": "user_role--user_role"
        }
      }
    },
    "oauth2_token--auth_code": {
      "attributes": {
        "id": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "value": {
          "type": "string"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "expire": {
          "type": "number"
        },
        "status": {
          "type": "boolean"
        }
      },
      "relationships": {
        "bundle": {
          "type": "hasOne",
          "model": "oauth2_token_type--oauth2_token_type"
        },
        "auth_user_id": {
          "type": "hasOne",
          "model": "user--user"
        },
        "client": {
          "type": "hasOne",
          "model": "consumer--consumer"
        },
        "scopes": {
          "type": "hasMany",
          "model": "user_role--user_role"
        }
      }
    },
    "oauth2_token--refresh_token": {
      "attributes": {
        "id": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "value": {
          "type": "string"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "expire": {
          "type": "number"
        },
        "status": {
          "type": "boolean"
        }
      },
      "relationships": {
        "bundle": {
          "type": "hasOne",
          "model": "oauth2_token_type--oauth2_token_type"
        },
        "auth_user_id": {
          "type": "hasOne",
          "model": "user--user"
        },
        "client": {
          "type": "hasOne",
          "model": "consumer--consumer"
        },
        "scopes": {
          "type": "hasMany",
          "model": "user_role--user_role"
        }
      }
    },
    "taxonomy_term--audience": {
      "attributes": {
        "tid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "weight": {
          "type": "integer"
        },
        "changed": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        }
      },
      "relationships": {
        "vid": {
          "type": "hasOne",
          "model": "taxonomy_vocabulary--taxonomy_vocabulary"
        },
        "parent": {
          "type": "hasMany",
          "model": "taxonomy_term--taxonomy_term"
        }
      }
    },
    "taxonomy_term--equipment_type": {
      "attributes": {
        "tid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "weight": {
          "type": "integer"
        },
        "changed": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        }
      },
      "relationships": {
        "vid": {
          "type": "hasOne",
          "model": "taxonomy_vocabulary--taxonomy_vocabulary"
        },
        "parent": {
          "type": "hasMany",
          "model": "taxonomy_term--taxonomy_term"
        }
      }
    },
    "taxonomy_term--evaluation_criteria": {
      "attributes": {
        "tid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "weight": {
          "type": "integer"
        },
        "changed": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        },
        "field_evaluation": {
          "type": "integer"
        }
      },
      "relationships": {
        "vid": {
          "type": "hasOne",
          "model": "taxonomy_vocabulary--taxonomy_vocabulary"
        },
        "parent": {
          "type": "hasMany",
          "model": "taxonomy_term--taxonomy_term"
        }
      }
    },
    "taxonomy_term--event_type": {
      "attributes": {
        "tid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "weight": {
          "type": "integer"
        },
        "changed": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        },
        "field_examples": {
          "type": "string"
        }
      },
      "relationships": {
        "vid": {
          "type": "hasOne",
          "model": "taxonomy_vocabulary--taxonomy_vocabulary"
        },
        "parent": {
          "type": "hasMany",
          "model": "taxonomy_term--taxonomy_term"
        }
      }
    },
    "taxonomy_term--lc_subject": {
      "attributes": {
        "tid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "weight": {
          "type": "integer"
        },
        "changed": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        }
      },
      "relationships": {
        "vid": {
          "type": "hasOne",
          "model": "taxonomy_vocabulary--taxonomy_vocabulary"
        },
        "parent": {
          "type": "hasMany",
          "model": "taxonomy_term--taxonomy_term"
        }
      }
    },
    "taxonomy_term--meeting_purpose": {
      "attributes": {
        "tid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "weight": {
          "type": "integer"
        },
        "changed": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        }
      },
      "relationships": {
        "vid": {
          "type": "hasOne",
          "model": "taxonomy_vocabulary--taxonomy_vocabulary"
        },
        "parent": {
          "type": "hasMany",
          "model": "taxonomy_term--taxonomy_term"
        }
      }
    },
    "taxonomy_term--population_segment": {
      "attributes": {
        "tid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "weight": {
          "type": "integer"
        },
        "changed": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        }
      },
      "relationships": {
        "vid": {
          "type": "hasOne",
          "model": "taxonomy_vocabulary--taxonomy_vocabulary"
        },
        "parent": {
          "type": "hasMany",
          "model": "taxonomy_term--taxonomy_term"
        }
      }
    },
    "taxonomy_term--room_type": {
      "attributes": {
        "tid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "weight": {
          "type": "integer"
        },
        "changed": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        }
      },
      "relationships": {
        "vid": {
          "type": "hasOne",
          "model": "taxonomy_vocabulary--taxonomy_vocabulary"
        },
        "parent": {
          "type": "hasMany",
          "model": "taxonomy_term--taxonomy_term"
        }
      }
    },
    "taxonomy_term--tag": {
      "attributes": {
        "tid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "object"
        },
        "weight": {
          "type": "integer"
        },
        "changed": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "path": {
          "type": "object"
        }
      },
      "relationships": {
        "vid": {
          "type": "hasOne",
          "model": "taxonomy_vocabulary--taxonomy_vocabulary"
        },
        "parent": {
          "type": "hasMany",
          "model": "taxonomy_term--taxonomy_term"
        }
      }
    },
    "user--user": {
      "attributes": {
        "uid": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "preferred_langcode": {
          "type": "object"
        },
        "preferred_admin_langcode": {
          "type": "object"
        },
        "name": {
          "type": "string"
        },
        "pass": {
          "type": "object"
        },
        "mail": {
          "type": "string"
        },
        "timezone": {
          "type": "string"
        },
        "status": {
          "type": "boolean"
        },
        "created": {
          "type": "number"
        },
        "changed": {
          "type": "number"
        },
        "access": {
          "type": "number"
        },
        "login": {
          "type": "number"
        },
        "init": {
          "type": "string"
        },
        "default_langcode": {
          "type": "boolean"
        }
      },
      "relationships": {
        "roles": {
          "type": "hasMany",
          "model": "user_role--user_role"
        }
      }
    },
    "menu_link_content--menu_link_content": {
      "attributes": {
        "id": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "langcode": {
          "type": "object"
        },
        "bundle": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "menu_name": {
          "type": "string"
        },
        "link": {
          "type": "object"
        },
        "external": {
          "type": "boolean"
        },
        "rediscover": {
          "type": "boolean"
        },
        "weight": {
          "type": "integer"
        },
        "expanded": {
          "type": "boolean"
        },
        "enabled": {
          "type": "boolean"
        },
        "parent": {
          "type": "string"
        },
        "changed": {
          "type": "number"
        },
        "default_langcode": {
          "type": "boolean"
        }
      }
    },
    "paragraph--stories_image": {
      "attributes": {
        "id": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "revision_id": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "status": {
          "type": "boolean"
        },
        "created": {
          "type": "number"
        },
        "parent_id": {
          "type": "string"
        },
        "parent_type": {
          "type": "string"
        },
        "parent_field_name": {
          "type": "string"
        },
        "behavior_settings": {
          "type": "string"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "field_stories_alignment": {
          "type": "string"
        }
      },
      "relationships": {
        "type": {
          "type": "hasOne",
          "model": "paragraphs_type--paragraphs_type"
        },
        "uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "revision_uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "field_stories_image": {
          "type": "hasOne",
          "model": "media--image"
        }
      }
    },
    "paragraph--stories_slideshow": {
      "attributes": {
        "id": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "revision_id": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "status": {
          "type": "boolean"
        },
        "created": {
          "type": "number"
        },
        "parent_id": {
          "type": "string"
        },
        "parent_type": {
          "type": "string"
        },
        "parent_field_name": {
          "type": "string"
        },
        "behavior_settings": {
          "type": "string"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "field_stories_alignment": {
          "type": "string"
        }
      },
      "relationships": {
        "type": {
          "type": "hasOne",
          "model": "paragraphs_type--paragraphs_type"
        },
        "uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "revision_uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "field_stories_slideshow": {
          "type": "hasOne",
          "model": "media--slideshow"
        }
      }
    },
    "paragraph--stories_web_video": {
      "attributes": {
        "id": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "revision_id": {
          "type": "integer"
        },
        "langcode": {
          "type": "object"
        },
        "status": {
          "type": "boolean"
        },
        "created": {
          "type": "number"
        },
        "parent_id": {
          "type": "string"
        },
        "parent_type": {
          "type": "string"
        },
        "parent_field_name": {
          "type": "string"
        },
        "behavior_settings": {
          "type": "string"
        },
        "default_langcode": {
          "type": "boolean"
        },
        "revision_translation_affected": {
          "type": "boolean"
        },
        "field_stories_alignment": {
          "type": "string"
        }
      },
      "relationships": {
        "type": {
          "type": "hasOne",
          "model": "paragraphs_type--paragraphs_type"
        },
        "uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "revision_uid": {
          "type": "hasOne",
          "model": "user--user"
        },
        "field_stories_web_video": {
          "type": "hasOne",
          "model": "media--web_video"
        }
      }
    }
  }
}

const schema = new Schema(schemaDefinition);
export default schema;
