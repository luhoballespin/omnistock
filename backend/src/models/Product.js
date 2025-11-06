/**
 * Modelo de Producto
 * Define el esquema y modelo de productos en MongoDB
 */

import mongoose from 'mongoose';

/**
 * Esquema de Producto
 * Define la estructura de datos para productos en el sistema
 */
const productSchema = new mongoose.Schema(
  {
    // SKU único del producto (Stock Keeping Unit)
    sku: {
      type: String,
      required: [true, 'El SKU es requerido'],
      unique: true,
      trim: true,
      uppercase: true,
      index: true, // Índice para búsquedas rápidas
    },

    // Nombre del producto
    nombre: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      maxlength: [200, 'El nombre no puede exceder 200 caracteres'],
    },

    // Descripción del producto
    descripcion: {
      type: String,
      trim: true,
      maxlength: [1000, 'La descripción no puede exceder 1000 caracteres'],
      default: '',
    },

    // Precio del producto
    precio: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: [0, 'El precio no puede ser negativo'],
    },

    // Stock disponible
    stock: {
      type: Number,
      required: [true, 'El stock es requerido'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },

    // Canales donde está disponible el producto
    // Ejemplo: ["TiendaNube", "MercadoLibre", "Shopify", "POS"]
    canal: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          // Validar que sea un array de strings no vacíos
          return Array.isArray(v) && v.every(item => typeof item === 'string' && item.trim().length > 0);
        },
        message: 'Los canales deben ser un array de strings no vacíos'
      }
    },

    // URL de la imagen del producto
    imagen: {
      type: String,
      trim: true,
      default: '',
    },

    // Fecha de última actualización
    actualizadoEn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Opciones del esquema
    timestamps: true, // Crea automáticamente createdAt y updatedAt
    versionKey: false, // No incluir __v en los documentos
  }
);

// Índice compuesto para búsquedas por SKU y canal
productSchema.index({ sku: 1, canal: 1 });

// Middleware pre-save: actualizar actualizadoEn antes de guardar
productSchema.pre('save', function (next) {
  this.actualizadoEn = new Date();
  next();
});

// Middleware pre-update: actualizar actualizadoEn antes de actualizar
productSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
  this.set({ actualizadoEn: new Date() });
  next();
});

/**
 * Método de instancia: convertir a JSON público
 * Elimina campos sensibles si es necesario
 */
productSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return obj;
};

/**
 * Método estático: buscar por SKU
 * @param {string} sku - SKU del producto
 * @returns {Promise<Document>}
 */
productSchema.statics.findBySku = function (sku) {
  return this.findOne({ sku: sku.toUpperCase() });
};

/**
 * Método estático: buscar productos por canal
 * @param {string} canal - Nombre del canal
 * @returns {Promise<Document[]>}
 */
productSchema.statics.findByCanal = function (canal) {
  return this.find({ canal: { $in: [canal] } });
};

// Crear y exportar el modelo
const Product = mongoose.model('Product', productSchema);

export default Product;

