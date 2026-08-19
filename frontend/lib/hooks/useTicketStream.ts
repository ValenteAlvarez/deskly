"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type ConnectionStatus = "connecting" | "connected" | "disconnected";

export function useTicketStream() {
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/tickets");

    ws.onopen = () => setStatus("connected");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.tipo === "ticket.creado" || data.tipo === "ticket.actualizado") {
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      }
      if (data.tipo === "ticket.comentado") {
        queryClient.invalidateQueries({queryKey: ['tickets']})
      }
    };

    ws.onclose = () => setStatus("disconnected");

    return () => {
      ws.close();
    };
  }, [queryClient]);

  return status;
}