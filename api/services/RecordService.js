var getValues = function(sensor, callback){
	Measure.find({sensor:sensor.id}).exec(function(err, measures){
		if (measures.length === 0) {
			callback();
		}
		else {
			var measuresValues = [];
			var measuresTotal = 0;
			measures.forEach(function(measure){
				var value = parseInt(measure.value);
				measuresValues.push(value);
				measuresTotal += value;
			});
			var mean = measuresTotal / measuresValues.length;
			callback({
				mean: mean,
				min: Math.min.apply(null, measuresValues),
				max: Math.max.apply(null, measuresValues),
				timerange: sensor.recordFrequency,
				sensor: sensor.id
			});
		}
	});
}

var recordTimeouts = {};

exports.recordSensor = function(sensor) {
	var batch = function() {
		if (typeof(recordTimeouts[sensor.id])!=='undefined'){
			clearTimeout(recordTimeouts[sensor.id]);
		}
		getValues(sensor, function(record){
			recordTimeouts[sensor.id] = setTimeout(function() {
				if (record) {
					Record.create(record).exec(function(err, record){
						if (err) {
							console.log(err);
						}
						else {
							console.log('Record saved');
							console.dir(record);
							Measure.destroy({sensor:sensor.id}).exec(function(err) {
								console.log('Measures destroyed');
							});
						}
					});					
				}
				batch();
			}, parseInt(sensor.recordFrequency));
		});
	};
	batch();
};