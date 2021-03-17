package org.ballerinalang.langserver.extensions.project;

import org.ballerinalang.langserver.extensions.LSExtensionTestUtil;
import org.ballerinalang.langserver.extensions.ballerina.project.model.AddDependencyResponse;
import org.ballerinalang.langserver.util.TestUtil;
import org.eclipse.lsp4j.jsonrpc.Endpoint;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.io.IOException;

public class AddDependencyTest {

    private Endpoint serviceEndpoint;

    @BeforeClass
    public void startLangServer() throws IOException {
        this.serviceEndpoint = TestUtil.initializeLanguageSever();
    }

    @Test(description = "Test add project dependency")
    public void testProjectAddDependency() throws IOException {
        AddDependencyResponse response = LSExtensionTestUtil.addProjectDependency("Test add project dependency", serviceEndpoint);
        Assert.assertFalse(response.isSuccess());
    }

    @AfterClass
    public void stopLangServer() {
        TestUtil.shutdownLanguageServer(this.serviceEndpoint);
    }
}
