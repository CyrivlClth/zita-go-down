package debt

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPick(t *testing.T) {
	for i := 0; i < 100; i++ {
		t.Run(fmt.Sprintf("test pick %d", i), func(tt *testing.T) {
			total := 1000
			nums := []int{3, 7, 20, 70}
			expect := []int{3 * total, 7 * total, 20 * total, 70 * total}
			result := make([]int, 4)
			for i := 0; i < 100*total; i++ {
				j := Pick(nums)
				assert.NotEqualValues(tt, -1, j)
				result[j]++
			}

			assert.InDeltaSlice(tt, expect, result, float64(total))
		})
	}
}
