package com.rfb.web.rest;

import com.rfb.RfbloyaltyApp;
import com.rfb.domain.RfbUser;
import com.rfb.domain.User;
import com.rfb.repository.RfbUserRepository;
import com.rfb.service.RfbUserService;
import com.rfb.service.dto.RfbUserDTO;
import com.rfb.service.mapper.RfbUserMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RfbUserResource} REST controller.
 */
@SpringBootTest(classes = RfbloyaltyApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RfbUserResourceIT {

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    @Autowired
    private RfbUserRepository rfbUserRepository;

    @Autowired
    private RfbUserMapper rfbUserMapper;

    @Autowired
    private RfbUserService rfbUserService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRfbUserMockMvc;

    private RfbUser rfbUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RfbUser createEntity(EntityManager em) {
        RfbUser rfbUser = new RfbUser()
            .username(DEFAULT_USERNAME);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        rfbUser.setUser(user);
        return rfbUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RfbUser createUpdatedEntity(EntityManager em) {
        RfbUser rfbUser = new RfbUser()
            .username(UPDATED_USERNAME);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        rfbUser.setUser(user);
        return rfbUser;
    }

    @BeforeEach
    public void initTest() {
        rfbUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createRfbUser() throws Exception {
        int databaseSizeBeforeCreate = rfbUserRepository.findAll().size();
        // Create the RfbUser
        RfbUserDTO rfbUserDTO = rfbUserMapper.toDto(rfbUser);
        restRfbUserMockMvc.perform(post("/api/rfb-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rfbUserDTO)))
            .andExpect(status().isCreated());

        // Validate the RfbUser in the database
        List<RfbUser> rfbUserList = rfbUserRepository.findAll();
        assertThat(rfbUserList).hasSize(databaseSizeBeforeCreate + 1);
        RfbUser testRfbUser = rfbUserList.get(rfbUserList.size() - 1);
        assertThat(testRfbUser.getUsername()).isEqualTo(DEFAULT_USERNAME);

        // Validate the id for MapsId, the ids must be same
        assertThat(testRfbUser.getId()).isEqualTo(testRfbUser.getUser().getId());
    }

    @Test
    @Transactional
    public void createRfbUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rfbUserRepository.findAll().size();

        // Create the RfbUser with an existing ID
        rfbUser.setId(1L);
        RfbUserDTO rfbUserDTO = rfbUserMapper.toDto(rfbUser);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRfbUserMockMvc.perform(post("/api/rfb-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rfbUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RfbUser in the database
        List<RfbUser> rfbUserList = rfbUserRepository.findAll();
        assertThat(rfbUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void updateRfbUserMapsIdAssociationWithNewId() throws Exception {
        // Initialize the database
        rfbUserRepository.saveAndFlush(rfbUser);
        int databaseSizeBeforeCreate = rfbUserRepository.findAll().size();


        // Load the rfbUser
        RfbUser updatedRfbUser = rfbUserRepository.findById(rfbUser.getId()).get();
        // Disconnect from session so that the updates on updatedRfbUser are not directly saved in db
        em.detach(updatedRfbUser);

        // Update the User with new association value
        updatedRfbUser.setUser();
        RfbUserDTO updatedRfbUserDTO = rfbUserMapper.toDto(updatedRfbUser);

        // Update the entity
        restRfbUserMockMvc.perform(put("/api/rfb-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRfbUserDTO)))
            .andExpect(status().isOk());

        // Validate the RfbUser in the database
        List<RfbUser> rfbUserList = rfbUserRepository.findAll();
        assertThat(rfbUserList).hasSize(databaseSizeBeforeCreate);
        RfbUser testRfbUser = rfbUserList.get(rfbUserList.size() - 1);

        // Validate the id for MapsId, the ids must be same
        // Uncomment the following line for assertion. However, please note that there is a known issue and uncommenting will fail the test.
        // Please look at https://github.com/jhipster/generator-jhipster/issues/9100. You can modify this test as necessary.
        // assertThat(testRfbUser.getId()).isEqualTo(testRfbUser.getUser().getId());
    }

    @Test
    @Transactional
    public void getAllRfbUsers() throws Exception {
        // Initialize the database
        rfbUserRepository.saveAndFlush(rfbUser);

        // Get all the rfbUserList
        restRfbUserMockMvc.perform(get("/api/rfb-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rfbUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME)));
    }
    
    @Test
    @Transactional
    public void getRfbUser() throws Exception {
        // Initialize the database
        rfbUserRepository.saveAndFlush(rfbUser);

        // Get the rfbUser
        restRfbUserMockMvc.perform(get("/api/rfb-users/{id}", rfbUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(rfbUser.getId().intValue()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME));
    }
    @Test
    @Transactional
    public void getNonExistingRfbUser() throws Exception {
        // Get the rfbUser
        restRfbUserMockMvc.perform(get("/api/rfb-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRfbUser() throws Exception {
        // Initialize the database
        rfbUserRepository.saveAndFlush(rfbUser);

        int databaseSizeBeforeUpdate = rfbUserRepository.findAll().size();

        // Update the rfbUser
        RfbUser updatedRfbUser = rfbUserRepository.findById(rfbUser.getId()).get();
        // Disconnect from session so that the updates on updatedRfbUser are not directly saved in db
        em.detach(updatedRfbUser);
        updatedRfbUser
            .username(UPDATED_USERNAME);
        RfbUserDTO rfbUserDTO = rfbUserMapper.toDto(updatedRfbUser);

        restRfbUserMockMvc.perform(put("/api/rfb-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rfbUserDTO)))
            .andExpect(status().isOk());

        // Validate the RfbUser in the database
        List<RfbUser> rfbUserList = rfbUserRepository.findAll();
        assertThat(rfbUserList).hasSize(databaseSizeBeforeUpdate);
        RfbUser testRfbUser = rfbUserList.get(rfbUserList.size() - 1);
        assertThat(testRfbUser.getUsername()).isEqualTo(UPDATED_USERNAME);
    }

    @Test
    @Transactional
    public void updateNonExistingRfbUser() throws Exception {
        int databaseSizeBeforeUpdate = rfbUserRepository.findAll().size();

        // Create the RfbUser
        RfbUserDTO rfbUserDTO = rfbUserMapper.toDto(rfbUser);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRfbUserMockMvc.perform(put("/api/rfb-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rfbUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RfbUser in the database
        List<RfbUser> rfbUserList = rfbUserRepository.findAll();
        assertThat(rfbUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRfbUser() throws Exception {
        // Initialize the database
        rfbUserRepository.saveAndFlush(rfbUser);

        int databaseSizeBeforeDelete = rfbUserRepository.findAll().size();

        // Delete the rfbUser
        restRfbUserMockMvc.perform(delete("/api/rfb-users/{id}", rfbUser.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RfbUser> rfbUserList = rfbUserRepository.findAll();
        assertThat(rfbUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
