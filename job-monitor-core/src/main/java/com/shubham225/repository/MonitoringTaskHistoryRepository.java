package com.shubham225.repository;

import com.shubham225.model.entity.MonitoringTaskHistory;
import com.shubham225.model.enums.FailureReason;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MonitoringTaskHistoryRepository extends JpaRepository<MonitoringTaskHistory, Long> {
    long countByCause(FailureReason cause);
    Optional<MonitoringTaskHistory> findTopByOrderByTerminatedOnDesc();
    List<MonitoringTaskHistory> findTop100ByOrderByExecutedOnDesc();
    @Query("""
    SELECT m.cause, COUNT(m)
    FROM MonitoringTaskHistory m
    WHERE m.cause IS NOT NULL
    GROUP BY m.cause
""")
    List<Object[]> countByFailureReason();

    // Note: compared ordinal value 9 (FailureReason.EXECUTED) here in th JPQL
    @Query("""
    SELECT
        MONTH(m.executedOn),
        SUM(CASE WHEN m.cause = :executed THEN 1 ELSE 0 END),
        SUM(CASE WHEN m.cause <> :executed THEN 1 ELSE 0 END)
    FROM MonitoringTaskHistory m
    WHERE YEAR(m.executedOn) = :year
    GROUP BY MONTH(m.executedOn)
    ORDER BY MONTH(m.executedOn)
    """)
    List<Object[]> getMonthlyExecutionTrend(
            @Param("year") int year,
            @Param("executed") FailureReason executed
    );

    List<MonitoringTaskHistory> findByExecutedOnBetween(LocalDateTime start, LocalDateTime end);
}
