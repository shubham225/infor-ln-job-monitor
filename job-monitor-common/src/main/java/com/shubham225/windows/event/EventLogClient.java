package com.shubham225.windows.event;

import com.shubham225.windows.event.domain.EventLogQuery;

public interface EventLogClient {
    int generateEventViewerLog(EventLogQuery query);
}
