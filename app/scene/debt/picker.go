package debt

import (
	"math/rand"
	"time"
)

var random = rand.New(rand.NewSource(time.Now().UnixNano()))

func Pick(slice []int) int {
	s := 0
	for _, n := range slice {
		s += n
	}
	r := random.Intn(s)
	c := 0
	for i, n := range slice {
		c += n
		if r < c {
			return i
		}
	}
	return -1
}
