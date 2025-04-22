const { ToolBox } = require('@codebolt/codeboltjs/utils');
const { z } = require('zod');

const toolbox = new ToolBox({
  name: "CodeboltDocs",
  version: "1.0.0",
  description: "Documentation tools for the Codebolt SDK"
});

// SDK Module information
const sdkModules = {
  fs: {
    description: "File system operations",
    functions: {
      createFile: {
        description: "Creates a new file with the specified content",
        parameters: [
          { name: "fileName", type: "string", description: "The name of the file to create" },
          { name: "source", type: "string", description: "The source content to write into the file" },
          { name: "filePath", type: "string", description: "The path where the file should be created" }
        ],
        returns: "Promise<CreateFileResponse>",
        example: "codebolt.fs.createFile('example.txt', 'Hello World', '/path/to/dir')"
      },
      readFile: {
        description: "Reads the content of a file",
        parameters: [
          { name: "filePath", type: "string", description: "The path of the file to read" }
        ],
        returns: "Promise<ReadFileResponse>",
        example: "codebolt.fs.readFile('/path/to/file.txt')"
      },
      updateFile: {
        description: "Updates the content of a file",
        parameters: [
          { name: "filename", type: "string", description: "The name of the file to update" },
          { name: "filePath", type: "string", description: "The path of the file to update" },
          { name: "newContent", type: "string", description: "The new content to write into the file" }
        ],
        returns: "Promise<UpdateFileResponse>",
        example: "codebolt.fs.updateFile('example.txt', '/path/to/dir', 'Updated content')"
      },
      deleteFile: {
        description: "Deletes a file",
        parameters: [
          { name: "filename", type: "string", description: "The name of the file to delete" },
          { name: "filePath", type: "string", description: "The path of the file to delete" }
        ],
        returns: "Promise<DeleteFileResponse>",
        example: "codebolt.fs.deleteFile('example.txt', '/path/to/dir')"
      },
      createFolder: {
        description: "Creates a new folder",
        parameters: [
          { name: "folderName", type: "string", description: "The name of the folder to create" },
          { name: "folderPath", type: "string", description: "The path where the folder should be created" }
        ],
        returns: "Promise<CreateFolderResponse>",
        example: "codebolt.fs.createFolder('newDir', '/path/to/parent')"
      },
      deleteFolder: {
        description: "Deletes a folder",
        parameters: [
          { name: "foldername", type: "string", description: "The name of the folder to delete" },
          { name: "folderpath", type: "string", description: "The path of the folder to delete" }
        ],
        returns: "Promise<DeleteFolderResponse>",
        example: "codebolt.fs.deleteFolder('oldDir', '/path/to/parent')"
      },
      listFile: {
        description: "Lists all files and directories in the specified path",
        parameters: [
          { name: "folderPath", type: "string", description: "The path to list files from" },
          { name: "isRecursive", type: "boolean", description: "Whether to list files recursively", optional: true, default: false }
        ],
        returns: "Promise<FileListResponse>",
        example: "codebolt.fs.listFile('/path/to/dir', true)"
      }
    }
  },
  git: {
    description: "Git repository operations",
    functions: {
      status: {
        description: "Get the status of a git repository",
        parameters: [
          { name: "repoPath", type: "string", description: "The path to the git repository" }
        ],
        returns: "Promise<GitStatusResponse>",
        example: "codebolt.git.status('/path/to/repo')"
      },
      commit: {
        description: "Commit changes to a git repository",
        parameters: [
          { name: "repoPath", type: "string", description: "The path to the git repository" },
          { name: "message", type: "string", description: "The commit message" }
        ],
        returns: "Promise<GitCommitResponse>",
        example: "codebolt.git.commit('/path/to/repo', 'Add new feature')"
      },
      push: {
        description: "Push committed changes to a remote repository",
        parameters: [
          { name: "repoPath", type: "string", description: "The path to the git repository" }
        ],
        returns: "Promise<GitPushResponse>",
        example: "codebolt.git.push('/path/to/repo')"
      },
      pull: {
        description: "Pull changes from a remote repository",
        parameters: [
          { name: "repoPath", type: "string", description: "The path to the git repository" }
        ],
        returns: "Promise<GitPullResponse>",
        example: "codebolt.git.pull('/path/to/repo')"
      }
    }
  },
  terminal: {
    description: "Terminal command execution",
    functions: {
      executeCommand: {
        description: "Execute a command in the terminal",
        parameters: [
          { name: "command", type: "string", description: "The command to execute" },
          { name: "cwd", type: "string", description: "The current working directory", optional: true }
        ],
        returns: "Promise<CommandExecutionResponse>",
        example: "codebolt.terminal.executeCommand('ls -la', '/home/user')"
      }
    }
  },
  codeutils: {
    description: "Utilities for code analysis and manipulation",
    functions: {
      analyzeCode: {
        description: "Analyze code to extract functions, classes, and other definitions",
        parameters: [
          { name: "code", type: "string", description: "The code to analyze" },
          { name: "language", type: "string", description: "The programming language of the code" }
        ],
        returns: "Promise<CodeAnalysisResult>",
        example: "codebolt.codeutils.analyzeCode('function add(a, b) { return a + b; }', 'javascript')"
      }
    }
  },
  project: {
    description: "Project management functionality",
    functions: {
      getProjectInfo: {
        description: "Get information about the current project",
        parameters: [],
        returns: "Promise<ProjectInfo>",
        example: "codebolt.project.getProjectInfo()"
      }
    }
  },
  search: {
    description: "Search functionality within the codebase",
    functions: {
      searchCodebase: {
        description: "Search the codebase for a specific query",
        parameters: [
          { name: "query", type: "string", description: "The search query" },
          { name: "path", type: "string", description: "The path to search in", optional: true },
          { name: "filePattern", type: "string", description: "Pattern to match files", optional: true }
        ],
        returns: "Promise<SearchResults>",
        example: "codebolt.search.searchCodebase('function main', '/src', '*.js')"
      }
    }
  },
  llm: {
    description: "Large Language Model integration",
    functions: {
      getCompletion: {
        description: "Get a completion from an LLM",
        parameters: [
          { name: "prompt", type: "string", description: "The prompt to send to the LLM" },
          { name: "model", type: "string", description: "The model to use", optional: true, default: "gpt-4" },
          { name: "maxTokens", type: "number", description: "The maximum number of tokens to generate", optional: true, default: 1000 }
        ],
        returns: "Promise<LLMCompletionResponse>",
        example: "codebolt.llm.getCompletion('Write a function that adds two numbers', 'gpt-4', 500)"
      }
    }
  },
  tools: {
    description: "Tools management for external MCP toolboxes",
    functions: {
      getAvailableToolBoxes: {
        description: "Get all available toolboxes",
        parameters: [],
        returns: "Promise<ToolboxList>",
        example: "codebolt.tools.getAvailableToolBoxes()"
      },
      searchAvailableToolBoxes: {
        description: "Search for available toolboxes matching a query",
        parameters: [
          { name: "query", type: "string", description: "The search query" }
        ],
        returns: "Promise<ToolboxList>",
        example: "codebolt.tools.searchAvailableToolBoxes('git')"
      },
      executeTool: {
        description: "Execute a specific tool with provided parameters",
        parameters: [
          { name: "toolbox", type: "string", description: "The name of the toolbox containing the tool" },
          { name: "toolName", type: "string", description: "The name of the tool to execute" },
          { name: "params", type: "object", description: "Parameters to pass to the tool" }
        ],
        returns: "Promise<ToolExecutionResult>",
        example: "codebolt.tools.executeTool('GitTools', 'commit', { path: '/repo', message: 'Update' })"
      }
    }
  },
  browser: {
    description: "Browser automation and interaction",
    functions: {
      openPage: {
        description: "Open a web page in the browser",
        parameters: [
          { name: "url", type: "string", description: "The URL to open" }
        ],
        returns: "Promise<BrowserPageResponse>",
        example: "codebolt.browser.openPage('https://example.com')"
      }
    }
  }
};



// Get a concise list of all SDK functions
toolbox.addTool({
  name: "getSdkFunctionsList",
  description: "Get a concise list of all functions available in the Codebolt SDK",
  parameters: z.object({
    random_string: z.string().optional().describe("Dummy parameter for no-parameter tools")
  }),
  execute: async (args, context) => {
    const functionsList = [];
    
    // Iterate through all modules and functions
    Object.entries(sdkModules).forEach(([moduleName, moduleData]) => {
      Object.entries(moduleData.functions).forEach(([funcName, funcData]) => {
        // Format parameter lists for better readability
        const paramsList = funcData.parameters.map(param => {
          const optional = param.optional ? '?' : '';
          return `${param.name}${optional}: ${param.type}`;
        }).join(', ');
        
        functionsList.push({
          module: moduleName,
          function: funcName,
          signature: `${funcName}(${paramsList}) => ${funcData.returns}`,
          description: funcData.description
        });
      });
    });
    
    return {
      content: [{ type: "text", text: JSON.stringify(functionsList) }]
    };
  }
});


// Get detailed information about a specific function
toolbox.addTool({
  name: "getSdkFunctionDetail",
  description: "Get detailed information about a specific function in the Codebolt SDK",
  parameters: z.object({
    moduleName: z.string().describe("The name of the module containing the function"),
    functionName: z.string().describe("The name of the function to get details for")
  }),
  execute: async (args, context) => {
    const { moduleName, functionName } = args;
    
    if (!sdkModules[moduleName]) {
      return {
        content: [{ type: "text", text: `Module '${moduleName}' not found in the Codebolt SDK` }],
        isError: true
      };
    }
    
    if (!sdkModules[moduleName].functions[functionName]) {
      return {
        content: [{ type: "text", text: `Function '${functionName}' not found in module '${moduleName}'` }],
        isError: true
      };
    }
    
    const functionDetail = sdkModules[moduleName].functions[functionName];
    
    return {
      content: [{ type: "text", text: JSON.stringify(functionDetail) }]
    };
  }
});


// Get SDK initialization and setup information
toolbox.addTool({
  name: "getSdkSetupInfo",
  description: "Get information about initializing and setting up the Codebolt SDK",
  parameters: z.object({
    random_string: z.string().optional().describe("Dummy parameter for no-parameter tools")
  }),
  execute: async (args, context) => {
    const setupInfo = {
      import: "import codebolt from '@codebolt/codeboltjs';",
      initialization: "// Wait for connection to be established\nawait codebolt.waitForConnection();",
      usage: "// Example of using the SDK\nconst fileContent = await codebolt.fs.readFile('/path/to/file.txt');",
      modules: "// Available modules\n// codebolt.fs - File system operations\n// codebolt.git - Git operations\n// codebolt.terminal - Terminal commands\n// codebolt.codeutils - Code analysis utilities\n// codebolt.project - Project management\n// codebolt.search - Codebase search\n// codebolt.llm - LLM integration\n// codebolt.tools - MCP tools management\n// codebolt.browser - Browser automation"
    };
    
    return {
      content: [{ type: "text", text: JSON.stringify(setupInfo) }]
    };
  }
});

// Search SDK documentation
toolbox.addTool({
  name: "searchSdkDocs",
  description: "Search the Codebolt SDK documentation for specific terms",
  parameters: z.object({
    query: z.string().describe("The search query")
  }),
  execute: async (args, context) => {
    const { query } = args;
    const searchResults = [];
    
    // Simple search implementation
    const queryLower = query.toLowerCase();
    
    // Search in modules
    Object.keys(sdkModules).forEach(moduleName => {
      const moduleDesc = sdkModules[moduleName].description.toLowerCase();
      if (moduleDesc.includes(queryLower) || moduleName.toLowerCase().includes(queryLower)) {
        searchResults.push({
          type: "module",
          name: moduleName,
          description: sdkModules[moduleName].description,
          match: "Module name or description matches query"
        });
      }
      
      // Search in functions
      Object.keys(sdkModules[moduleName].functions).forEach(funcName => {
        const func = sdkModules[moduleName].functions[funcName];
        const funcDesc = func.description.toLowerCase();
        
        if (funcName.toLowerCase().includes(queryLower) || funcDesc.includes(queryLower)) {
          searchResults.push({
            type: "function",
            module: moduleName,
            name: funcName,
            description: func.description,
            match: "Function name or description matches query"
          });
        }
        
        // Search in parameters
        func.parameters.forEach(param => {
          if (param.name.toLowerCase().includes(queryLower) || 
              param.description.toLowerCase().includes(queryLower)) {
            searchResults.push({
              type: "parameter",
              module: moduleName,
              function: funcName,
              name: param.name,
              description: param.description,
              match: "Parameter name or description matches query"
            });
          }
        });
      });
    });
    
    if (searchResults.length === 0) {
      return {
        content: [{ 
          type: "text", 
          text: `No results found for query: "${query}". Try a different search term.` 
        }]
      };
    }
    
    return {
      content: [{ type: "text", text: JSON.stringify(searchResults) }]
    };
  }
});

async function main() {
  try {
    // Activate the toolbox
    await toolbox.activate({
      transportType: "stdio"
    });
    
    console.log('Codebolt SDK Documentation MCP is running!');
  } catch (error) {
    console.error('Failed to start Codebolt SDK Documentation MCP:', error);
  }
}

main();

// Export the tool functions for testing
module.exports = {
  toolbox
};

