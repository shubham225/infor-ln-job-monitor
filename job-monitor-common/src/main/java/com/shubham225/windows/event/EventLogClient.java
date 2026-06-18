package com.shubham225.windows.event;

import com.shubham225.windows.event.domain.EventLogQuery;

public interface EventLogClient {
    int getEventViewerLog(EventLogQuery query);
    int addEventViewerLog(String logName, String source, String entryType, String message);
}
