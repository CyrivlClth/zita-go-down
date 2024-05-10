package execute

import (
	"encoding/json"
	"errors"
	"os"
	"os/exec"
	"path/filepath"
)

// Config execute configuration
type Config struct {
	Path string `json:"path"`
}

// GetConfig get configuration
func GetConfig() (map[string]Config, error) {
	configDir, err := os.UserHomeDir()
	if err != nil {
		return nil, err
	}
	jsonFilePath := filepath.Join(configDir, "zita.json")
	jsonData, err := os.ReadFile(jsonFilePath)
	if err != nil {
		return nil, err
	}
	r := make(map[string]Config)
	err = json.Unmarshal(jsonData, &r)
	if err != nil {
		return nil, err
	}
	return r, nil
}

// Execute execute command
func Execute(use string, args ...string) error {
	config, err := GetConfig()
	if err != nil {
		return err
	}
	u, ok := config[use]
	if !ok {
		return errors.New("use path not found in config")
	}
	cmd := exec.Command(u.Path, args...)
	cmd.Stdout = os.Stdout
	return cmd.Run()
}
