export default {
    name: 'list',
    title: 'List',
    type: 'document',
    fields: [
        {
            name: 'listName',
            title: 'List Name',
            type: 'string',
        },
        {
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [{type: 'string'}]
        },
        {
            name: 'allowed users',
            title: 'Allowed Users',
            type: 'array',
            of: [{type: 'string'}]
        }
    ]
}