import mongoose from "mongoose";


// Function that converts fields array → Mongoose schema definition
export function generateDynamicSchema(fields) {
  const schemaDefinition = {};

  fields.forEach(field => {
    let def = { type: String }; // default type

    // Map string dataType to mongoose type
    switch (field.dataType) {
      case 'Number':
        def.type = Number;
        break;
      case 'Boolean':
        def.type = Boolean;
        break;
      case 'Date':
        def.type = Date;
        break;
      default:
        def.type = String;
    }

    // Add default value if exists
    if (field.default) {
      def.default = field.default;
    }

    // Add enum if provided
    if (field.enum && field.enum.length) {
      def.enum = field.enum;
    }

    schemaDefinition[field.columnName] = def;
  });

  return new mongoose.Schema(schemaDefinition, { timestamps: true });
}


// Generate schema dynamically
// const DynamicModel = mongoose.model('ProjectMaster', DynamicSchema);

// Now you can use DynamicModel like a normal Mongoose model
