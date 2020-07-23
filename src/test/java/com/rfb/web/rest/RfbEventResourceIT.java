package com.rfb.web.rest;

import com.rfb.RfbloyaltyApp;
import com.rfb.domain.RfbEvent;
import com.rfb.repository.RfbEventRepository;
import com.rfb.service.RfbEventService;
import com.rfb.service.dto.RfbEventDTO;
import com.rfb.service.mapper.RfbEventMapper;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RfbEventResource} REST controller.
 */
@SpringBootTest(classes = RfbloyaltyApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RfbEventResourceIT {

    private static final LocalDate DEFAULT_EVENT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EVENT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_EVENT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_EVENT_CODE = "BBBBBBBBBB";

    @Autowired
    private RfbEventRepository rfbEventRepository;

    @Autowired
    private RfbEventMapper rfbEventMapper;

    @Autowired
    private RfbEventService rfbEventService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRfbEventMockMvc;

    private RfbEvent rfbEvent;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RfbEvent createEntity(EntityManager em) {
        RfbEvent rfbEvent = new RfbEvent()
            .eventDate(DEFAULT_EVENT_DATE)
            .eventCode(DEFAULT_EVENT_CODE);
        return rfbEvent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RfbEvent createUpdatedEntity(EntityManager em) {
        RfbEvent rfbEvent = new RfbEvent()
            .eventDate(UPDATED_EVENT_DATE)
            .eventCode(UPDATED_EVENT_CODE);
        return rfbEvent;
    }

    @BeforeEach
    public void initTest() {
        rfbEvent = createEntity(em);
    }

    @Test
    @Transactional
    public void createRfbEvent() throws Exception {
        int databaseSizeBeforeCreate = rfbEventRepository.findAll().size();
        // Create the RfbEvent
        RfbEventDTO rfbEventDTO = rfbEventMapper.toDto(rfbEvent);
        restRfbEventMockMvc.perform(post("/api/rfb-events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rfbEventDTO)))
            .andExpect(status().isCreated());

        // Validate the RfbEvent in the database
        List<RfbEvent> rfbEventList = rfbEventRepository.findAll();
        assertThat(rfbEventList).hasSize(databaseSizeBeforeCreate + 1);
        RfbEvent testRfbEvent = rfbEventList.get(rfbEventList.size() - 1);
        assertThat(testRfbEvent.getEventDate()).isEqualTo(DEFAULT_EVENT_DATE);
        assertThat(testRfbEvent.getEventCode()).isEqualTo(DEFAULT_EVENT_CODE);
    }

    @Test
    @Transactional
    public void createRfbEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rfbEventRepository.findAll().size();

        // Create the RfbEvent with an existing ID
        rfbEvent.setId(1L);
        RfbEventDTO rfbEventDTO = rfbEventMapper.toDto(rfbEvent);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRfbEventMockMvc.perform(post("/api/rfb-events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rfbEventDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RfbEvent in the database
        List<RfbEvent> rfbEventList = rfbEventRepository.findAll();
        assertThat(rfbEventList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRfbEvents() throws Exception {
        // Initialize the database
        rfbEventRepository.saveAndFlush(rfbEvent);

        // Get all the rfbEventList
        restRfbEventMockMvc.perform(get("/api/rfb-events?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rfbEvent.getId().intValue())))
            .andExpect(jsonPath("$.[*].eventDate").value(hasItem(DEFAULT_EVENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].eventCode").value(hasItem(DEFAULT_EVENT_CODE)));
    }
    
    @Test
    @Transactional
    public void getRfbEvent() throws Exception {
        // Initialize the database
        rfbEventRepository.saveAndFlush(rfbEvent);

        // Get the rfbEvent
        restRfbEventMockMvc.perform(get("/api/rfb-events/{id}", rfbEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(rfbEvent.getId().intValue()))
            .andExpect(jsonPath("$.eventDate").value(DEFAULT_EVENT_DATE.toString()))
            .andExpect(jsonPath("$.eventCode").value(DEFAULT_EVENT_CODE));
    }
    @Test
    @Transactional
    public void getNonExistingRfbEvent() throws Exception {
        // Get the rfbEvent
        restRfbEventMockMvc.perform(get("/api/rfb-events/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRfbEvent() throws Exception {
        // Initialize the database
        rfbEventRepository.saveAndFlush(rfbEvent);

        int databaseSizeBeforeUpdate = rfbEventRepository.findAll().size();

        // Update the rfbEvent
        RfbEvent updatedRfbEvent = rfbEventRepository.findById(rfbEvent.getId()).get();
        // Disconnect from session so that the updates on updatedRfbEvent are not directly saved in db
        em.detach(updatedRfbEvent);
        updatedRfbEvent
            .eventDate(UPDATED_EVENT_DATE)
            .eventCode(UPDATED_EVENT_CODE);
        RfbEventDTO rfbEventDTO = rfbEventMapper.toDto(updatedRfbEvent);

        restRfbEventMockMvc.perform(put("/api/rfb-events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rfbEventDTO)))
            .andExpect(status().isOk());

        // Validate the RfbEvent in the database
        List<RfbEvent> rfbEventList = rfbEventRepository.findAll();
        assertThat(rfbEventList).hasSize(databaseSizeBeforeUpdate);
        RfbEvent testRfbEvent = rfbEventList.get(rfbEventList.size() - 1);
        assertThat(testRfbEvent.getEventDate()).isEqualTo(UPDATED_EVENT_DATE);
        assertThat(testRfbEvent.getEventCode()).isEqualTo(UPDATED_EVENT_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingRfbEvent() throws Exception {
        int databaseSizeBeforeUpdate = rfbEventRepository.findAll().size();

        // Create the RfbEvent
        RfbEventDTO rfbEventDTO = rfbEventMapper.toDto(rfbEvent);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRfbEventMockMvc.perform(put("/api/rfb-events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rfbEventDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RfbEvent in the database
        List<RfbEvent> rfbEventList = rfbEventRepository.findAll();
        assertThat(rfbEventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRfbEvent() throws Exception {
        // Initialize the database
        rfbEventRepository.saveAndFlush(rfbEvent);

        int databaseSizeBeforeDelete = rfbEventRepository.findAll().size();

        // Delete the rfbEvent
        restRfbEventMockMvc.perform(delete("/api/rfb-events/{id}", rfbEvent.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RfbEvent> rfbEventList = rfbEventRepository.findAll();
        assertThat(rfbEventList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
