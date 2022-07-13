const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('dog', {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        height: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year:{
            type: DataTypes.STRING, 
            allowNull: false,
            get() {
                const addAnios = this.getDataValue('year');
                return `${addAnios} years`;
            }
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'https://media.istockphoto.com/vectors/wiener-dog-dressed-as-a-hot-dog-vector-illustration-vector-id1170183630?k=20&m=1170183630&s=612x612&w=0&h=vCO395llIWCLGXx1UQ2ryILW8gdK18Pkpfcgd4j9cCQ='
        }
    });
};
