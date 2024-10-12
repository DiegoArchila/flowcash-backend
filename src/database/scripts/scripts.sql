/* 
	This show the flowcash_type in total "0" if not any data for set the sum
*/
SELECT
	flowcash_type.id AS _id,
	flowcash_type.name AS caja, 
 	--operation.type AS operacion,
	operation_type.type AS tipo,
	SUM(COALESCE(public.flowcash.value,0)) AS total 
FROM flowcash
INNER JOIN flowcash_type ON
	flowcash_type.id = flowcash.flowcash_type_id	
INNER JOIN operation ON
	operation.id = flowcash.operation_id
INNER JOIN operation_type ON
	operation_type.id = operation.operation_type_id
GROUP BY _id, caja, tipo
ORDER BY caja;