package server

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func Run(port int) error {
	s := gin.Default()

	s.GET("/check", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"protocol": "zita"})
	})

	return s.Run(fmt.Sprintf(":%d", port))
}
