package www.dream.bbs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BullitineBoardApplication extends SpringBootServletInitializer {
    // 이 부분 추가
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(BullitineBoardApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(BullitineBoardApplication.class, args);
	}
}
