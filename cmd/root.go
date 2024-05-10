package cmd

import (
	"fmt"
	"net/url"
	"os"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "zita-go-down",
	Short: "A utility CLI tool for customizing workflows",
	Long:  `This command-line interface (CLI) tool is designed to streamline and enhance the process of customizing and managing complex workflows. It provides a suite of features that allow users to automate repetitive tasks, integrate with various services, and optimize their workflow for efficiency and productivity. With a focus on flexibility and ease of use, this CLI tool is an indispensable asset for anyone looking to take control of their workflow and get more done with less effort.`,
	Args:  cobra.MinimumNArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		re := regexp.MustCompile("^(\\w+)://(.*?)/(.*)$")
		find := re.FindStringSubmatch(args[0])
		if len(find) < 4 {
			return cmd.Usage()
		}
		q, err := url.QueryUnescape(find[3])
		if err != nil {
			return err
		}
		cmd.SetArgs(append([]string{find[2]}, strings.Split(q, " ")...))
		return cmd.Execute()
	},
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

var cfgFile string

func init() {
	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here,
	// will be global for your application.
	cobra.OnInitialize(initConfig)
	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.zita.yaml)")

	// Cobra also supports local flags, which will only run
	// when this action is called directly.
	rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

func initConfig() {
	if cfgFile != "" {
		// Use config file from the flag.
		viper.SetConfigFile(cfgFile)
	} else {
		// Find home directory.
		home, err := os.UserHomeDir()
		cobra.CheckErr(err)

		// Search config in home directory with name ".zita.yaml".
		viper.AddConfigPath(home)
		viper.SetConfigType("yaml")
		viper.SetConfigName(".zita.yaml")
	}

	viper.AutomaticEnv() // read in environment variables that match

	// If a config file is found, read it in.
	if err := viper.ReadInConfig(); err == nil {
		fmt.Fprintln(os.Stderr, "Using config file:", viper.ConfigFileUsed())
	}
}
