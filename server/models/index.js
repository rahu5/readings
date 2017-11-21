'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from'../config';
import dbConfig from '../config/database.json';

let dbEnvConfig = dbConfig[config.ENV];

//	Sequelize connection with the database provided by dbConfig
let sequelize = new Sequelize(dbEnvConfig.database, dbEnvConfig.username, dbEnvConfig.password, dbEnvConfig);

let db        = {};

fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf('.') !== 0) && (file !== 'index.js');
	})
	.forEach(function(file) {
		let model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

// Execute associate of each model to make foreign keys
Object.keys(db).forEach(function(modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

module.exports = db;
