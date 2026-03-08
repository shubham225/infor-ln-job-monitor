package com.shubham225.config;

import picocli.CommandLine;

public class VersionProvider implements CommandLine.IVersionProvider {
    @Override
    public String[] getVersion() throws Exception {
        String version = "v" + Version.get();
        return new String[] { version };
    }
}
