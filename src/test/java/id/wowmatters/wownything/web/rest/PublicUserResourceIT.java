package id.wowmatters.wownything.web.rest;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import id.wowmatters.wownything.IntegrationTest;
import id.wowmatters.wownything.domain.User;
import id.wowmatters.wownything.repository.UserRepository;
import id.wowmatters.wownything.repository.search.UserSearchRepository;
import id.wowmatters.wownything.security.AuthoritiesConstants;
import java.util.Set;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;

/**
 * Integration tests for the {@link PublicUserResource} REST controller.
 */
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_TIMEOUT)
@WithMockUser(authorities = AuthoritiesConstants.ADMIN)
@IntegrationTest
class PublicUserResourceIT {

    @Autowired
    private UserRepository userRepository;

    /**
     * This repository is mocked in the id.wowmatters.wownything.repository.search test package.
     *
     * @see id.wowmatters.wownything.repository.search.UserSearchRepositoryMockConfiguration
     */
    @Autowired
    private UserSearchRepository mockUserSearchRepository;

    @Autowired
    private WebTestClient webTestClient;

    private User user;

    @BeforeEach
    void setupCsrf() {
        webTestClient = webTestClient.mutateWith(csrf());
    }

    @BeforeEach
    void initTest() {
        user = UserResourceIT.initTestUser();
    }

    @AfterEach
    void cleanupAndCheck() {
        userRepository.deleteAllUserAuthorities().block();
        userRepository.deleteAll().block();
    }

    @Test
    void getAllPublicUsers() {
        // Initialize the database
        userRepository.create(user).block();

        // Get all the users
        webTestClient
            .get()
            .uri("/api/users?sort=id,desc")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[?(@.id == '%s')].login", user.getId())
            .isEqualTo(user.getLogin())
            .jsonPath("$.[?(@.id == '%s')].keys()", user.getId())
            .isEqualTo(Set.of("id", "login"))
            .jsonPath("$.[*].email")
            .doesNotHaveJsonPath()
            .jsonPath("$.[*].imageUrl")
            .doesNotHaveJsonPath()
            .jsonPath("$.[*].langKey")
            .doesNotHaveJsonPath();
    }
}
