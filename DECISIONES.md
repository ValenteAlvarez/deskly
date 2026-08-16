### Decision: Base de datos
- **Contexto:** Habia que decidir entre utilizar MongoDB o PostgreSQL.
- **Uso de LLM:** Le pedi su opinión sobre utilizar MongoDB dado que había muy poca necesidad de tener relaciones entre entidades. 
- **Salida del modelo:** Estuvo de acuerdo conmigo en que MongoDB era buena opción: También mencionó como enforzar schemas para cumplir con los requisitos de tipado del proyecto. 
- **Mi decisión:** Acepté usar MongoDB, y decidí usarlo de manera local por medio de una imagen de Docker en lugar de usar Atlas, para simplificar el uso y no necesitar configurar cuentas o depender del estado de los servidores de MongoDB.

### Decision: Exclusion de propiedades
- **Contexto:** Dados los requerimientos de usar una maquina de estados para el cambio de estatus, habia que decidir si pedir o permitir que se mandara esta propiedad en el cuerpo del PATCH de un ticket.
- **Uso de LLM:** Ayuda con la sintaxis y estructura de los schemas de las diferentes acciones de la API
- **Salida del modelo:** Me preguntó si estaba olvidando incluir la propiedad de "estado"
- **Mi decisión:** Decidí excluirla, dado que así prohibimos que se modifique el estado sin pasar por el endpoint que explícitamente existe para esto: así, tenemos total control de que cualquier cambio de estado pase por la logica de la máquina de estados


### Decision: Version de cliente para Mongo
- **Contexto:** Usar Motor vs AsyncMongoClient de pymongo
- **Uso de LLM:** Ayuda con el setup de la funcion principal del backend, por mi falta de conocimiento usando Python en el backend
- **Salida del modelo:** El LLM me dio codigo que usaba Motor como cliente de MongoDB. Despues de ver errores del linter y revisar que Beanie, el ODM que estoy usando, no tenia como dependencia a Motor, le cuestioné esta decisión y revisé la documentación.
- **Mi decisión:** Justamente, Motor ya no es utilizado en la version 2.0.0 en adelante de Beanie, por lo que el LLM me estaba dando codigo desactualizado. Hicimos los cambios pertinentes.