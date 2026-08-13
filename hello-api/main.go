package main

import (
	"encoding/json"
	"log"
	"net/http"
)

// Greeting mirrors the openapi.yaml Greeting schema.
type Greeting struct {
	Message string `json:"message"`
}

// ErrorResponse mirrors the openapi.yaml Error schema.
type ErrorResponse struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(body)
}

// withRecovery turns any unexpected panic into a 500 response shaped like
// the openapi.yaml Error schema, instead of crashing the process.
func withRecovery(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				writeJSON(w, http.StatusInternalServerError, ErrorResponse{
					Code:    http.StatusInternalServerError,
					Message: "internal server error",
				})
			}
		}()
		next.ServeHTTP(w, r)
	})
}

// withCORS is only needed because hello-api has no exposesAPI managed-gateway
// config and hello-webapp's browser calls it directly.
func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func getGreetingHandler(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, Greeting{Message: "Hello, World!"})
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /greeting", getGreetingHandler)

	handler := withRecovery(withCORS(mux))

	log.Println("hello-api listening on :9090")
	if err := http.ListenAndServe(":9090", handler); err != nil {
		log.Fatal(err)
	}
}
