package com.niranjan.Controller;


import com.niranjan.dto.ClickEventDTO;
import com.niranjan.dto.UrlMappingDTO;
import com.niranjan.models.User;
import com.niranjan.service.UrlMappingService;
import com.niranjan.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {

    private UrlMappingService urlMappingService;
    private UserService userService;

    //{"OriginalUrl":"https://www.example.com"}
    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMappingDTO> createShortUrl(@RequestBody Map<String, String> request,
                                                        Principal principal) {
        String OriginalUrl = request.get("originalUrl");
        User user = userService.findByEmail(principal.getName());
        UrlMappingDTO urlMappingDTO = urlMappingService.createShortUrl(OriginalUrl, user);
        return ResponseEntity.ok(urlMappingDTO);
    }

    @GetMapping("/myurls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity <List<UrlMappingDTO>> getUserUrl(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        List<UrlMappingDTO> userUrls = urlMappingService.getUrlsByUser(user);
        return ResponseEntity.ok(userUrls);
    }

    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity <List<ClickEventDTO>> getUrlAnalytics (@PathVariable String shortUrl,
                                                                 @RequestParam("startDate") String startDate,
                                                                 @RequestParam("endDate") String endDate){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);
        List<ClickEventDTO> clickEventDTOS  = urlMappingService.getClickEventsByDate(shortUrl, start, end);
        return ResponseEntity.ok(clickEventDTOS);
    }

    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity <Map<LocalDate, Long>> getTotalClicksByDate(Principal principal,
                                                                      @RequestParam("startDate") String startDate,
                                                                      @RequestParam("endDate") String endDate){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        User user = userService.findByEmail(principal.getName());
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);
        Map<LocalDate, Long> totalClicks  = urlMappingService.getTotalClickByUserAndDate(user, start, end);
        return ResponseEntity.ok(totalClicks);
    }



}
