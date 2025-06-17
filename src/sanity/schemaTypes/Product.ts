const product = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },

      {
        name: 'quantity',
        title: 'Quantity',
        type: 'string',
      },
      {
        name: 'stock',
        title: 'stock',
        type: 'string',
      },
      // schemas/product.js
{
  name: 'reviews',
  title: 'Reviews',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'name', type: 'string' },
        { name: 'date', type: 'datetime' },
        { name: 'message', type: 'text' },
        { name: 'rating', type: 'number' },
      ],
    },
  ],
}

      
      
    ],
  }
  
  export default product
  