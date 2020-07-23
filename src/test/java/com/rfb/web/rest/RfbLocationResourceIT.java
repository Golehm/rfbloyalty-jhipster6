package com.rfb.web.rest;

import com.rfb.RfbloyaltyApp;
import com.rfb.domain.RfbLocation;
import com.rfb.repository.RfbLocationRepository;
import com.rfb.service.RfbLocationService;
import com.rfb.service.dto.RfbLocationDTO;
import com.rfb.service.mapper.RfbLocationMapper;

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
 * Integration tests for the {@link RfbLocationResource} REST controller.
 */
@SpringBootTest(classes = RfbloyaltyApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RfbLocationResourceIT {

    private static final String DEFAULT_LOCATION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_RUN_DAY_OF_WEEK = 1;
    private static final Integer UPDATED_RUN_DAY_OF_WEEK = 2;

    @Autowired
    private RfbLocationRepository rfbLocationRepository;

    @Autowired
    private RfbLocationMapper rfbLocationMapper;

    @Autowired
    private RfbLocationService rfbLocationService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRfbLocationMockMvc;

    private RfbLocation rfbLocation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RfbLocation createEntity(EntityManager em) {
        RfbLocation rfbLocation = new RfbLocation()
            .locationName(DEFAULT_LOCATION_NAME)
            .runDayOfWeek(DEFAULT_RUN_DAY_OF_WEEK);
        return rfbLocation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RfbLocation createUpdatedEntity(EntityManager em) {
        RfbLocation rfbLocation = new RfbLocation()
            .locationName(UPDATED_LOCATION_NAME)
            .runDayOfWeek(UPDATED_RUN_DAY_OF_WEEK);
        return rfbLocation;
    }

    @BeforeEach
    public void initTest() {
        rfbLocation = createEntity(em);
    }

    @Test
    @Transactional
    public void createRfbLocation() throws Exception {
        int databaseSizeBeforeCreate = rfbLocationRepository.findAll().size();
        // Create the RfbLocation
        RfbLocationDTO rfbLocationDTO = rfbLocationMapper.toDto(rfbLocation);
        restRfbLocationMockMvc.perform(post("/api/rfb-locations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rfbLocationDTO)))
            .andExpect(status().isCreated());

        // Validate the RfbLocation in the database
        List<RfbLocation> rfbLocationList = rfbLocationRepository.findAll();
        assertThat(rfbLocationList).hasSize(databaseSizeBeforeCreate + 1);
        RfbLocation testRfbLocation = rfbLocationList.get(rfbLocationList.size() - 1);
        assertThat(testRfbLocation.getLocationName()).isEqualTo(DEFAULT_LOCATION_NAME);
        assertThat(testRfbLocation.getRunDayOfWeek()).isEqualTo(DEFAULT_RUN_DAY_OF_WEEK);
    }

    @Test
    @Transactional
    public void createRfbLocationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rfbLocationRepository.findAll().size();

        // Create the RfbLocation with an existing ID
        rfbLocation.setId(1L);
        RfbLocationDTO rfbLocationDTO = rfbLocationMapper.toDto(rfbLocation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRfbLocationMockMvc.perform(post("/api/rfb-locations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rfbLocationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RfbLocation in the database
        List<RfbLocation> rfbLocationList = rfbLocationRepository.findAll();
        assertThat(rfbLocationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRfbLocations() throws Exception {
        // Initialize the database
        rfbLocationRepository.saveAndFlush(rfbLocation);

        // Get all the rfbLocationList
        restRfbLocationMockMvc.perform(get("/api/rfb-locations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rfbLocation.getId().intValue())))
            .andExpect(jsonPath("$.[*].locationName").value(hasItem(DEFAULT_LOCATION_NAME)))
            .andExpect(jsonPath("$.[*].runDayOfWeek").value(hasItem(DEFAULT_RUN_DAY_OF_WEEK)));
    }
    
    @Test
    @Transactional
    public void getRfbLocation() throws Exception {
        // Initialize the database
        rfbLocationRepository.saveAndFlush(rfbLocation);

        // Get the rfbLocation
        restRfbLocationMockMvc.perform(get("/api/rfb-locations/{id}", rfbLocation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(rfbLocation.getId().intValue()))
            .andExpect(jsonPath("$.locationName").value(DEFAULT_LOCATION_NAME))
            .andExpect(jsonPath("$.runDayOfWeek").value(DEFAULT_RUN_DAY_OF_WEEK));
    }
    @Test
    @Transactional
    public void getNonExistingRfbLocation() throws Exception {
        // Get the rfbLocation
        restRfbLocationMockMvc.perform(get("/api/rfb-locations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRfbLocation() throws Exception {
        // Initialize the database
        rfbLocationRepository.saveAndFlush(rfbLocation);

        int databaseSizeBeforeUpdate = rfbLocationRepository.findAll().size();

        // Update the rfbLocation
        RfbLocation updatedRfbLocation = rfbLocationRepository.findById(rfbLocation.getId()).get();
        // Disconnect from session so that the updates on updatedRfbLocation are not directly saved in db
        em.detach(updatedRfbLocation);
        updatedRfbLocation
            .locationName(UPDATED_LOCATION_NAME)
            .runDayOfWeek(UPDATED_RUN_DAY_OF_WEEK);
        RfbLocationDTO rfbLocationDTO = rfbLocationMapper.toDto(updatedRfbLocation);

        restRfbLocationMockMvc.perform(put("/api/rfb-locations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rfbLocationDTO)))
            .andExpect(status().isOk());

        // Validate the RfbLocation in the database
        List<RfbLocation> rfbLocationList = rfbLocationRepository.findAll();
        assertThat(rfbLocationList).hasSize(databaseSizeBeforeUpdate);
        RfbLocation testRfbLocation = rfbLocationList.get(rfbLocationList.size() - 1);
        assertThat(testRfbLocation.getLocationName()).isEqualTo(UPDATED_LOCATION_NAME);
        assertThat(testRfbLocation.getRunDayOfWeek()).isEqualTo(UPDATED_RUN_DAY_OF_WEEK);
    }

    @Test
    @Transactional
    public void updateNonExistingRfbLocation() throws Exception {
        int databaseSizeBeforeUpdate = rfbLocationRepository.findAll().size();

        // Create the RfbLocation
        RfbLocationDTO rfbLocationDTO = rfbLocationMapper.toDto(rfbLocation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRfbLocationMockMvc.perform(put("/api/rfb-locations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rfbLocationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RfbLocation in the database
        List<RfbLocation> rfbLocationList = rfbLocationRepository.findAll();
        assertThat(rfbLocationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRfbLocation() throws Exception {
        // Initialize the database
        rfbLocationRepository.saveAndFlush(rfbLocation);

        int databaseSizeBeforeDelete = rfbLocationRepository.findAll().size();

        // Delete the rfbLocation
        restRfbLocationMockMvc.perform(delete("/api/rfb-locations/{id}", rfbLocation.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RfbLocation> rfbLocationList = rfbLocationRepository.findAll();
        assertThat(rfbLocationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
