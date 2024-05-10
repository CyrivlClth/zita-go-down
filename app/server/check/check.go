package check

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-resty/resty/v2"
)

func Check(port int) bool {
	client := resty.New()
	resp, err := client.R().
		SetHeader("Accept", "application/json").
		Get(fmt.Sprintf("http://localhost:%d/check", port))
	if err != nil {
		return false
	}
	if resp.StatusCode() != http.StatusOK {
		return false
	}
	var r map[string]string
	err = json.Unmarshal(resp.Body(), &r)
	if err != nil {
		return false
	}
	return r["protocol"] == "zita"
}
