"use strict";

module.exports = (sequelize, DataTypes) => {
	let Op = sequelize.Op;
    const Readings = sequelize.define("readings", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        reading : {
            type : DataTypes.FLOAT,
            allowNull : false
        },
		timestamp : {
			type : DataTypes.DATE,
			allowNull : false
		},
		sensorType : {
			type : DataTypes.STRING,
            allowNull : false
		}
    });

	Readings.addOne = function(reading, timestamp, sensorType) {
		return Readings.create({
			reading,
			timestamp,
			sensorType
		});
	};

	Readings.findBetween = function(dateRange, sensorType) {
		let where = {};

		if(sensorType){
			where.sensorType = sensorType;
		}

		if(dateRange && dateRange.to && dateRange.from){
			where[Op.and] = [{
				timestamp : {
					[Op.gte] : dateRange.from
				}
			},{
				timestamp : {
					[Op.lte] : dateRange.to
				}
			}];
		}

		return Readings.findAll({
			where,
			attributes : ['reading', 'timestamp', 'sensorType']
		});
	};

	Readings.findAggBetween = function(agg, dateRange, sensorType) {
		let where = {};

		if(sensorType){
			where.sensorType = sensorType;
		}

		if(dateRange && dateRange.to && dateRange.from){
			where[Op.and] = [{
				timestamp : {
					[Op.gte] : dateRange.from
				}
			},{
				timestamp : {
					[Op.lte] : dateRange.to
				}
			}];
		}
		return Readings.findAll({
			where,
			attributes : [[sequelize.fn(agg, sequelize.col('reading')), agg]]
		});
	};

    return Readings;
}
