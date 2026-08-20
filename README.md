# Deskly: Sistema de manejo de tickets

## Pasos de arranque
Al no usar secretos ni datos sensibles, se puede clonar directamente los .env.example a archivos .env.local, solo es necesario generar copiar tal cual el .env.example dentro del directorio de frontend/ a un nuevo archivo .env (igual dentro del directorio de frontend/), y luego, desde el root del repositorio, correr los comandos de las instrucciones:

```
git clone https://github.com/ValenteAlvarez/deskly.git &&
cd <directorio> &&
cp .env.example .env &&
docker compose up --build
```

## Base de datos
Dada la baja (practicamente nula) necesidad de relaciones complejas entre diferentes entidades, decidi usar MongoDB para la base de datos.

Decidi indexar el atributo de 'Prioridad', ya que en éste me base para la implementación del filtrado y es el atributo que más lecturas tendrá

## Tiempo real invertido
~10-15 horas: aproximadamente entre una a tres horas diarias por 5 dias

### Script para probar Webhook:
```
BODY='{"title":"Test ticket","description":"From webhook","priority":"medium"}'
SECRET="changeme"
SIG=$(echo -n "$BODY" | openssl dgst -sha256 -hmac "$SECRET" | sed 's/^.* //')

curl -X POST http://localhost:8000/api/webhooks/tickets \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY"
  ```
