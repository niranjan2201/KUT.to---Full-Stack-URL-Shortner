package com.niranjan.repository;

import com.niranjan.models.ClickEvents;
import com.niranjan.models.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClickEventRepository extends JpaRepository< ClickEvents, Long> {
    List<ClickEvents> findByUrlMappingAndClickDateBetween(UrlMapping mapping, java.time.LocalDateTime startDate, java.time.LocalDateTime endDate);
    List<ClickEvents> findByUrlMappingInAndClickDateBetween(List<UrlMapping> urlMappings, java.time.LocalDateTime startDate, java.time.LocalDateTime endDate);
}
