package com.shubham225.config;

public class Version {
    public static String get() {
        try {
            var props = new java.util.Properties();
            props.load(Version.class.getResourceAsStream("/version.properties"));
            return props.getProperty("version");
        } catch (Exception e) {
            return "unknown";
        }
    }
}
