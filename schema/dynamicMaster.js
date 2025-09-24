import mongoose from 'mongoose';

// Recursive function that converts fields array → Mongoose schema definition
export function generateDynamicSchema(fields) {
  const schemaDefinition = {};

  fields.forEach(field => {
    let def;

    // ARRAY with nested columns
    if (field.type === 'ARRAY' && field.columns && field.columns.length) {
      const subSchema = generateDynamicSchema(field.columns);
      def = [subSchema]; // An array of sub-documents
    } else {
      // Default: map string type to mongoose type
      switch (field.type || field.dataType) {
        case 'Number':
          def = { type: Number };
          break;
        case 'Boolean':
          def = { type: Boolean };
          break;
        case 'Date':
          def = { type: Date };
          break;
        default:
          def = { type: String };
      }

      // Add default value if exists
      if (field.default !== null && field.default !== undefined) {
        def.default = field.default;
      }

      // Add enum if provided
      if (field.enum && field.enum.length) {
        def.enum = field.enum;
      }

      // Handle unique property
      if (field.unique === 'true' || field.unique === true) {
        def.unique = true;
      }

      // Handle ref property
      if (field.ref) {
        def.ref = field.ref; // use ref to link schemas
      }
    }

    schemaDefinition[field.columnName] = def;
  });

  return new mongoose.Schema(schemaDefinition, { timestamps: true });
}
