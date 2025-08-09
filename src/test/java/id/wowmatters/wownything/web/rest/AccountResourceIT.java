package id.wowmatters.wownything.web.rest;

import static id.wowmatters.wownything.test.util.OAuth2TestUtil.TEST_USER_LOGIN;
import static id.wowmatters.wownything.test.util.OAuth2TestUtil.authenticationToken;
import static id.wowmatters.wownything.test.util.OAuth2TestUtil.registerAuthenticationToken;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.*;

import id.wowmatters.wownything.IntegrationTest;
import id.wowmatters.wownything.repository.UserRepository;
import id.wowmatters.wownything.security.AuthoritiesConstants;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.client.ReactiveOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;

/**
 * Integration tests for the {@link AccountResource} REST controller.
 */
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_TIMEOUT)
@IntegrationTest
class AccountResourceIT {

    @Autowired
    private UserRepository userRepository;

    private Map<String, Object> claims;

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private ReactiveOAuth2AuthorizedClientService authorizedClientService;

    @Autowired
    private ClientRegistration clientRegistration;

    @BeforeEach
    void setup() {
        claims = new HashMap<>();
        claims.put("groups", Collections.singletonList(AuthoritiesConstants.ADMIN));
        claims.put("sub", "jane");
        claims.put("email", "jane.doe@jhipster.com");
    }

    @AfterEach
    void cleanup() {
        // Remove syncUserWithIdp users
        userRepository.deleteAllUserAuthorities().block();
        userRepository.deleteAll().block();
    }

    @Test
    void testGetExistingAccount() {
        webTestClient
            .mutateWith(
                mockAuthentication(registerAuthenticationToken(authorizedClientService, clientRegistration, authenticationToken(claims)))
            )
            .mutateWith(csrf())
            .get()
            .uri("/api/account")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .expectBody()
            .jsonPath("$.login")
            .isEqualTo("jane")
            .jsonPath("$.email")
            .isEqualTo("jane.doe@jhipster.com")
            .jsonPath("$.authorities")
            .isEqualTo(AuthoritiesConstants.ADMIN);
    }

    @Test
    void testGetUnknownAccount() {
        webTestClient.get().uri("/api/account").accept(MediaType.APPLICATION_JSON).exchange().expectStatus().is3xxRedirection();
    }

    @Test
    @WithUnauthenticatedMockUser
    void testNonAuthenticatedUser() {
        webTestClient.get().uri("/api/authenticate").exchange().expectStatus().isUnauthorized();
    }

    @Test
    @WithMockUser(TEST_USER_LOGIN)
    void testAuthenticatedUser() {
        webTestClient.get().uri("/api/authenticate").exchange().expectStatus().isNoContent();
    }
}
