// Función para formatear las respuestas del bot
function formatResponse(data) {
  if (Array.isArray(data)) {
      return data.map(product => {
          return `Product: ${product.name} \n` +
                 `Category: ${product.category.name} \n` +
                 `Description: ${product.description} \n` +
                 `Price: $${product.price} \n` +
                 `Available quantity: ${product.count} \n`;
      }).join('\n\n'); 
  } else {
      return `Product: ${data.name} \n` +
             `Category: ${data.category.name} \n` +
             `Description: ${data.description} \n` +
             `Price: $${data.price} \n` +
             `Available quantity: ${data.count} \n`;
  }
}

module.exports = { formatResponse };

