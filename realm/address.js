import Realm from 'realm';

class Address extends Realm.Object {}

Address.schema = {
    name: 'Address',
    properties: {
        id: 'string',
        neighborhood: 'string',
        street: 'string',
        city: 'string',
        state: 'string',
        zip: 'string',
        latitude: 'double',
        longitude: 'double',
        tags: {type: 'list', objectType: 'Tag'},
        date_updated: 'date',
        type_of_property: 'int',
        land_bank_property: {type: 'bool', optional: true},
        owner_name: {type: 'string', optional: true},
        owner_contact_number: {type: 'string', optional: true},
        owner_email: {type: 'string', optional: true},
        tenant_name: {type: 'string', optional: true},
        tenant_phone: {type: 'string', optional: true},
        tenant_email: {type: 'string', optional: true},
        creator_user_id: {type: 'string', optional: true},
        last_updated_user_id: {type: 'string', optional: true},
        latitude: {type: 'float', optional: false},
        longitude: {type: 'float', optional: false},
        follow_up_owner_needed: {type: 'bool', optional: true},
    },
};

export default Address;
