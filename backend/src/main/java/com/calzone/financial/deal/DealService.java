package com.calzone.financial.deal;

import com.calzone.financial.deal.dto.DealRequest;
import com.calzone.financial.deal.dto.DealResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DealService {

    private final DealRepository dealRepository;

    public DealService(DealRepository dealRepository) {
        this.dealRepository = dealRepository;
    }

    @Transactional(readOnly = true)
    public List<DealResponse> getAllDeals() {
        return dealRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public DealResponse createDeal(DealRequest request) {
        Deal deal = new Deal();
        deal.setName(request.name());
        deal.setCustomer(request.customer());
        deal.setAmount(request.amount());
        deal.setStage(request.stage());
        deal.setProbability(request.probability());
        deal.setOwner(request.owner());
        deal.setDueDate(request.dueDate());
        
        Deal savedDeal = dealRepository.save(deal);
        return toResponse(savedDeal);
    }

    @Transactional
    public DealResponse updateDeal(Long id, java.util.Map<String, Object> updates) {
        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Deal not found with id: " + id));

        if (updates.containsKey("name")) deal.setName((String) updates.get("name"));
        if (updates.containsKey("customer")) deal.setCustomer((String) updates.get("customer"));
        if (updates.containsKey("amount")) deal.setAmount((String) updates.get("amount"));
        if (updates.containsKey("stage")) deal.setStage((String) updates.get("stage"));
        if (updates.containsKey("probability")) deal.setProbability((Integer) updates.get("probability"));
        if (updates.containsKey("owner")) deal.setOwner((String) updates.get("owner"));
        if (updates.containsKey("dueDate")) {
             // Handle date parsing if necessary, assuming string or LocalDate
             Object dateObj = updates.get("dueDate");
             if (dateObj instanceof String) {
                 deal.setDueDate(java.time.LocalDate.parse((String) dateObj));
             } else if (dateObj instanceof java.time.LocalDate) {
                 deal.setDueDate((java.time.LocalDate) dateObj);
             }
        }

        Deal savedDeal = dealRepository.save(deal);
        return toResponse(savedDeal);
    }

    private DealResponse toResponse(Deal deal) {
        return new DealResponse(
            deal.getId(),
            deal.getName(),
            deal.getCustomer(),
            deal.getAmount(),
            deal.getStage(),
            deal.getProbability(),
            deal.getOwner(),
            deal.getDueDate(),
            deal.getCreatedAt(),
            deal.getUpdatedAt()
        );
    }
}
