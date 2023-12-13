package www.dream.bbs.security.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.savedrequest.RequestCacheAwareFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class DreamSecurityConfiguration {
	private final JwtTokenProvider jwtTokenProvider;

	@Autowired
	public DreamSecurityConfiguration(JwtTokenProvider jwtTokenProvider) {
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// 인증 문제
		http.httpBasic().disable() // base64로 인코딩하여 전달하는 구조
				.csrf().disable() // JWT 기반이므로 csrf 비활성화
				.cors().configurationSource(corsConfigurationSource())
				.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and().authorizeHttpRequests()
				.antMatchers("/sign-api/sign-in").permitAll() // 가입 및 로그인 주소는 허용
				.antMatchers("/**/anonymous/**").permitAll() 
				//.anyRequest().denyAll()
				.and().addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), RequestCacheAwareFilter.class) // JWT 인증
				.exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint()).and()
				.exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler());
		return http.build();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:3000"));
		configuration.setAllowedMethods(List.of("HEAD", "GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(List.of("Content-Type", "x-auth-token", "Access-Control-Allow-Origin", "Cache-control", "X-PINGOTHER"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}
}
