package com.alice.time;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class TimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(TimeApplication.class, args);
	}
}
