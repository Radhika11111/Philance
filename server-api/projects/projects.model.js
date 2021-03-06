'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');
// var projectDetails = require("./project.details.model");
// var projectTeam = require("./projects.team.model");

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

const projects = sequelize.define('projects', {
    projectId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'project_id'
    },
    projectName: {
        type: Sequelize.STRING,
        field: 'Project_name',
        allowNull: false
    },
    decription: {
        type: Sequelize.BLOB,
        field: 'description'
    },
    volunteers: {
        type: Sequelize.INTEGER,
        field: 'volunteers',
        default : 0
    },
    freelancers: {
        type: Sequelize.INTEGER,
        field: 'freelancers',
        default : 0
    },
    location: {
        type: Sequelize.STRING,
        field: 'location',
        allowNull: false
    },
    startDate: {
        type: Sequelize.DATE,
        field: 'start_date',
        defaultValue: Sequelize.NOW
    },
    endDate: {
        type: Sequelize.DATE,
        field: 'end_date'
    },
    estimatedBudget: {
        type: Sequelize.DOUBLE,
        field: 'estimated_budget',
        allowNull: false
    },
    creationDate: {
        type: Sequelize.DATE,
        field: 'creation_date',
        defaultValue: Sequelize.NOW
    },
    createdBy: {
        type: Sequelize.INTEGER,
        field: 'created_by'
    },
    lastUpdatedDate: {
        type: Sequelize.DATE,
        field: 'last_updated_date',
        defaultValue: Sequelize.NOW
    },
    lastUpdatedBy: {
        type: Sequelize.INTEGER,
        field: 'last_updated_by'
    },
    status: {
        type: Sequelize.STRING,
        field: 'status',
        defaultValue : 'ACTIVE'
    },
},
    {
        timestamps: false,
        freezeTableName: true
    },
    {
        classMethods: {
            associate: function(models) {
              projects.hasMany(models.projectDetails, {foreignKey: 'project_id'})
              projects.hasMany(models.projectTeam, {foreignKey: 'project_id'})
            }
          }
    }
);

// projects.hasMany(projectDetails);
module.exports = projects;