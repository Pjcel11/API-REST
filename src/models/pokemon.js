const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']
const { ValidationError } = require("sequelize")

module.exports = (sequelize,Datatypes) => {
    return sequelize.define('Pokemon',{ //nom de l(objet) et pour chaque on déf comme on aurait def en sql
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type : Datatypes.STRING,
            allowNull: false,
            unique:{
              msg: 'Le nom est déjà pris'
            },
            validate : {
                notEmpty: {msg: 'Le nom ne doit pas être vide'},
                notNull: {msg: 'Le nom du pokémon est une propriété requise'}
                //N'est pas la chaine vide
            }
        },
        hp: {
            type : Datatypes.INTEGER,
            allowNull: false,
            validate : {
                isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de vie'},
                min: {
                    args: [0],
                    msg: 'Les points de vie doivent être supérieurs ou égales à 0.'
                  },
                  max: {
                    args: [999],
                    msg: 'Les points de vie doivent être inférieures ou égales à 999.'
                  },
                notNull: {msg: 'Les points de vie sont une propriété requise'}
            }
        },
        cp: {
            type: Datatypes.INTEGER,
            allowNull: false,
            validate : {
                isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de capacité'},
                min: {
                    args: [0],
                    msg: 'Les points de dégâts doivent être supérieurs ou égales à 0.'
                  },
                  max: {
                    args: [99],
                    msg: 'Les points de dégâts doivent être inférieures ou égales à 99.'
                  },
                notNull: {msg: 'Les points de capacité sont une propriété requise'}
            }
        },
        picture:{
            type: Datatypes.STRING,
            allowNull: false, 
            validate :{
                isUrl: {msg: 'Utilisez uniquement des url valides pour les photos'},
                notNull: {msg: 'La photo est une propriété requise'}
            }
        },
        types: {
            type: Datatypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
              },
              set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value) {
                  if(!value) {
                    throw new Error('Un pokémon doit au moins avoir un type.')
                  }
                  if(value.split(',').length > 3) {
                    throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
                  }
                  value.split(',').forEach(type => {
                    if(!validTypes.includes(type)) {
                      throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
                    }
                  });
                }
              }
            
        }
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}
