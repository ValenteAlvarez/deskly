from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.lib.ws import manager
router = APIRouter()

@router.websocket('/ws/tickets')
async def tickets_websocket(websocket: WebSocket):
	await manager.connect(websocket)
	try:
		while True:
			await websocket.receive_text()
	except WebSocketDisconnect:
		print('Disconnecting socket')
		manager.disconnect(websocket)
