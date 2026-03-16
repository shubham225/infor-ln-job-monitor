package com.shubham225.util;

import java.net.InetAddress;

public class HostUtils {
    public static String getHostName() {
        try {
            return InetAddress.getLocalHost().getHostName();
        } catch (Exception e) {
            return "UNKNOWN-HOST";
        }
    }
}
